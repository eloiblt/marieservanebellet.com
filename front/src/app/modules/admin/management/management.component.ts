import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Picture, CategoryPicture as CategoryPicture } from 'src/app/model/model';
import { PicturesApiService } from 'src/app/services/api/pictures-api.service';
import { CategoryPicturesApiService } from 'src/app/services/api/categoryPictures-api.service';
import { ToastService } from '../../../services/toast.service';
import { environment } from '../../../../environments/environment';

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

  ngOnInit(): void {
    this.reset();
    this.specifications = [
      { name: 'Menu' },
      { name: 'Bandeau' },
      { name: 'Logo' }
    ];
  }

  reset() {
    this.initNewPicture();
    this.getPictures();
    this.getCategoryPictures();
  }

  initNewPicture() {
    this.newPicture = new Picture();
    this.newPicture.title = '';
    this.newPicture.technique = '';
    this.newPicture.gridColumn = '';
    this.newPicture.gridRow = '';
    this.newPicture.categoryId = null;
    this.newPicture.year = '';
    this.newPicture.url = '';
    this.newPicture.size = '';
    this.newCategoryPicture = new CategoryPicture();
    this.newCategoryPicture.title = '';
  }

  getPictures() {
    this.paintingApiService.get().subscribe(res => {
      this.pictures = res;
      this.newPicture.id = 1;
      while (this.pictures.find(p => p.id === this.newPicture.id)) {
        this.newPicture.id++;
      }
    }, err => {
      console.log(err);
    });
  }

  getCategoryPictures() {
    this.categoryPaintingApiService.get().subscribe(res => {
      this.categoryPictures = res;
      this.newCategoryPicture.id = 1;
      while (this.categoryPictures.find(p => p.id === this.newCategoryPicture.id)) {
        this.newCategoryPicture.id++;
      }
    }, err => {
      console.log(err);
    });
  }

  getPicturesByCategory(id: number) {
    return this.pictures.filter(p => p.categoryId === id);
  }

  createNewPicture() {
    if (!this.canCreatePicture()) { return; }
    this.paintingApiService.create(this.newPicture).subscribe(res => {
      this.reset();
    }, err => {
      console.log(err);
    });
    this.paintingApiService.postFile(this.fileToUpload).subscribe(res => {
    }, err => {
      this.toastService.success(err.error.text);
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

  updatePicture(p: Picture) {
    this.paintingApiService.update(p.id, p).subscribe(res => {
    }, err => {
      console.log(err);
    });
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
    return this.newPicture.id &&
      this.categoryPictures.find(c => c.id === this.newPicture.categoryId) &&
      this.fileToUpload;
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
    console.log(this.newPicture.url.split('.').pop())
    if (this.newPicture.url.split('.').pop() !== 'jpg') {
      this.toastService.error('Seuls les fichier JPG sont autorisés');
      this.fileToUpload = null;
      this.upload.nativeElement.value = '';
    }
  }
}
