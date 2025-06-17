import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { environment } from '../../../environments/environment';
import { firstValueFrom, switchMap } from 'rxjs';
import { CategoryPicture, Picture } from '../../model/model';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PicturesApiService } from '../../services/api/pictures.api-service';
import { CategoryPicturesApiService } from '../../services/api/category-pictures.api-service';
import { faCheck, faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { NgClass, NgOptimizedImage } from '@angular/common';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss'],
  imports: [
    FormsModule,
    FontAwesomeModule,
    NgClass,
    NgSelectComponent,
    NgOptimizedImage,
  ],
})
export class ManagementComponent implements OnInit {
  @ViewChild('upload', { static: false }) public upload: ElementRef =
    {} as ElementRef;
  public newPicture: Picture = {} as Picture;
  public pictures: Picture[] = [];
  public newCategoryPicture: CategoryPicture = {} as CategoryPicture;
  public categoryPictures: CategoryPicture[] = [];
  public show: number[] = [];
  public fileToUpload: File | null = null;
  public environment = environment;
  faCheck = faCheck;
  faMinusCircle = faMinusCircle;

  private readonly picturesApiService: PicturesApiService =
    inject(PicturesApiService);
  private readonly categoryPicturesApiService: CategoryPicturesApiService =
    inject(CategoryPicturesApiService);
  private readonly toastrService: ToastrService = inject(ToastrService);

  ngOnInit() {
    void this.reset();
  }

  async reset() {
    this.initNewPicture();
    this.pictures = await firstValueFrom(this.picturesApiService.get());
    this.categoryPictures = await firstValueFrom(
      this.categoryPicturesApiService.get(),
    );
  }

  initNewPicture() {
    this.newPicture = {} as Picture;
    this.newCategoryPicture = {} as CategoryPicture;
  }

  getPicturesByCategory(id: number) {
    return this.pictures.filter((p) => p.categoryId === id);
  }

  async createNewPicture() {
    if (!this.canCreatePicture()) {
      return;
    }

    const guuid = crypto.randomUUID();

    await firstValueFrom(
      this.picturesApiService
        .create({ ...this.newPicture, url: `${guuid}.webp` })
        .pipe(
          switchMap(() => {
            return this.picturesApiService.postFile(
              this.fileToUpload!,
              `${guuid}.${this.newPicture?.url?.split('.').pop()}`,
            );
          }),
        ),
    );

    await this.deleteOtherIsMenu(this.newPicture);
    await this.reset();
    this.fileToUpload = null;
    this.upload.nativeElement.value = '';
  }

  async createNewCategoryPicture() {
    if (!this.canCreateCategoryPicture()) {
      return;
    }

    await firstValueFrom(
      this.categoryPicturesApiService.create(this.newCategoryPicture),
    );

    await this.reset();
  }

  loaded(id: number) {
    this.show = [...this.show, id];
  }

  async updatePicture(p: Picture) {
    await this.deleteOtherIsMenu(p);
    await firstValueFrom(this.picturesApiService.update(p.id, p));
  }

  async deleteOtherIsMenu(p: Picture | undefined) {
    if (p?.isMenu) {
      for (const pictureToUpdate of this.getPicturesByCategory(
        p.categoryId,
      ).filter((c) => c.id !== p.id && c.isMenu)) {
        pictureToUpdate.isMenu = false;
        await firstValueFrom(
          this.picturesApiService.update(
            pictureToUpdate.id,
            pictureToUpdate,
            false,
          ),
        );
      }
    }
  }

  async updateCategoryPicture(c: CategoryPicture) {
    await firstValueFrom(this.categoryPicturesApiService.update(c.id, c));
  }

  canCreateCategoryPicture() {
    return this.newCategoryPicture?.title?.trim();
  }

  canCreatePicture() {
    return (
      this.newPicture?.categoryId && this.newPicture.title && this.fileToUpload
    );
  }

  async deletePicture(p: Picture) {
    await firstValueFrom(this.picturesApiService.delete(p.id));
    await this.reset();
  }

  async deleteCategoryPicture(c: CategoryPicture) {
    if (this.pictures.some((p) => p.categoryId === c.id)) {
      this.toastrService.error(
        'Cette catégorie contient des peintures',
        'Erreur',
      );
    } else {
      await firstValueFrom(this.picturesApiService.delete(c.id));
      await this.reset();
    }
  }

  handleFileInput(event: EventTarget) {
    const files = (event as HTMLInputElement).files;

    if (!files?.length) {
      this.fileToUpload = null;
      this.newPicture.url = '';
      return;
    }

    this.fileToUpload = files.item(0);
    this.newPicture.url = this.fileToUpload?.name ?? '';
  }
}
