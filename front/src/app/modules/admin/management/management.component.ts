import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Picture, CategoryPicture as CategoryPicture } from 'src/app/model/model';
import { PicturesApiService } from 'src/app/services/api/pictures-api.service';
import { CategoryPicturesApiService } from 'src/app/services/api/categoryPictures-api.service';
import { ToastService } from '../../../services/toast.service';
import { environment } from '../../../../environments/environment';
import { firstValueFrom, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {

  @ViewChild('upload', { static: false }) public upload: ElementRef;
  public newPicture: Picture;
  public pictures: Picture[];
  public newCategoryPicture: CategoryPicture;
  public categoryPictures: CategoryPicture[];
  public show = [];
  public specifications: any[];
  public fileToUpload: File = null;
  public environment = environment;

  constructor(
    private paintingApiService: PicturesApiService,
    private categoryPaintingApiService: CategoryPicturesApiService,
    protected toastService: ToastService
  ) { }

  async ngOnInit() {
    await this.reset();
  }

  async reset() {
    this.initNewPicture();
    this.pictures = await firstValueFrom(this.paintingApiService.get());
    this.categoryPictures = await firstValueFrom(this.categoryPaintingApiService.get());
  }

  initNewPicture() {
    this.newPicture = new Picture();
    this.newCategoryPicture = new CategoryPicture();
  }

  getPicturesByCategory(id: number) {
    return this.pictures.filter(p => p.categoryId === id);
  }

  async createNewPicture() {
    if (!this.canCreatePicture()) { return; }

    const guuid = crypto.randomUUID();

    this.paintingApiService.create({ ...this.newPicture, url: `${guuid}.webp` }).pipe(
      tap(async _ => await this.deleteOtherIsMenu(this.newPicture)),
      switchMap(_ => this.paintingApiService.postFile(this.fileToUpload, `${guuid}.${this.newPicture.url.split('.').pop()}`))
    ).subscribe(async _ => {
      this.reset();
    });

    this.fileToUpload = null;
    this.upload.nativeElement.value = '';
  }

  createNewCategoryPicture() {
    if (!this.canCreateCategoryPicture()) { return; }
    this.categoryPaintingApiService.create(this.newCategoryPicture).subscribe(res => {
      this.reset();
    }, err => {
      console.log(err);
    });
  }

  loaded(id: number) {
    this.show = [...this.show, id];
  }

  async updatePicture(p: Picture) {
    await this.deleteOtherIsMenu(p);
    await firstValueFrom(this.paintingApiService.update(p.id, p));
  }

  async deleteOtherIsMenu(p: Picture) {
    if (p.isMenu) {
      for (let pictureToUpdate of this.getPicturesByCategory(p.categoryId).filter(c => c.id !== p.id && c.isMenu)) {
        pictureToUpdate.isMenu = false;
        await firstValueFrom(this.paintingApiService.update(pictureToUpdate.id, pictureToUpdate, false));
      }
    }
  }

  updateCategoryPicture(c: CategoryPicture) {
    this.categoryPaintingApiService.update(c.id, c).subscribe(res => {
    }, err => {
      console.log(err);
    });
  }

  canCreateCategoryPicture() {
    return this.newCategoryPicture.title?.trim();
  }

  canCreatePicture() {
    return this.newPicture.categoryId && this.newPicture.title && this.fileToUpload;
  }

  deletePicture(p: Picture) {
    this.paintingApiService.delete(p.id).subscribe(res => {
      this.reset();
    }, err => {
      console.log(err);
    });
  }

  deleteCategoryPicture(c: CategoryPicture) {
    if (this.pictures.some(p => p.categoryId === c.id)) {
      this.toastService.error('Cette catégorie contient des peintures', 'Erreur');
    } else {
      this.categoryPaintingApiService.delete(c.id).subscribe(res => {
        this.reset();
      }, err => {
        console.log(err);
      });
    }
  }

  handleFileInput(event: any) {
    const files: FileList = (event as HTMLInputElement).files;

    this.fileToUpload = files.item(0);
    this.newPicture.url = this.fileToUpload.name;
  }
}
