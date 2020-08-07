import { Component, OnInit } from '@angular/core';
import { Picture, CategoryPicture as CategoryPicture } from 'src/app/model/model';
import { PicturesApiService } from 'src/app/services/api/pictures-api.service';
import { CategoryPicturesApiService } from 'src/app/services/api/categoryPictures-api.service';
import { basePicturePath } from '../../../helpers/constants';
import { ToastService } from '../../../services/toast.service';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {

  public newPicture: Picture;
  public pictures: Picture[];
  public newCategoryPicture: CategoryPicture;
  public categoryPictures: CategoryPicture[];
  public basePicturePath = basePicturePath;
  public show = [];
  public specifications: any[];
  public fileToUpload: File = null;

  constructor(
    private paintingApiService: PicturesApiService,
    private categoryPaintingApiService: CategoryPicturesApiService,
    protected toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.initNewPicture();
    this.getPictures();
    this.getCategoryPictures();
    this.specifications = [
      { name: 'Menu' },
      { name: 'Bandeau' },
      { name: 'Logo' }
    ];
  }

  initNewPicture() {
    this.newPicture = new Picture();
    this.newPicture.title = '';
    this.newPicture.technique = '';
    this.newPicture.gridColumn = '';
    this.newPicture.gridrow = '';
    this.newPicture.categoryId = null;
    this.newPicture.spec = '';
    this.newPicture.date = '';
    this.newPicture.url = '';
    this.newPicture.size = '';
    this.newCategoryPicture = new CategoryPicture();
    this.newCategoryPicture.name = '';
  }

  getPictures() {
    this.paintingApiService.get().subscribe(res => {
      this.pictures = res;
      this.newPicture.id = 1;
      while (this.pictures.find(p => p.id === this.newPicture.id)) {
        this.newPicture.id++;
      }
      console.log(this.pictures);
    }, err => {
      console.log(err);
    });
  }

  getCategoryPictures() {
    this.categoryPaintingApiService.get().subscribe(res => {
      this.categoryPictures = res;
      console.log(this.categoryPictures);
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
      this.initNewPicture();
      this.getPictures();
    }, err => {
      console.log(err);
    });
    this.paintingApiService.postFile(this.fileToUpload).subscribe(res => {
      this.fileToUpload
    }, err => {
      console.log(err);
    });
  }

  createNewCategoryPicture() {
    if (!this.canCreateCategoryPicture()) { return; }
    this.categoryPaintingApiService.create(this.newCategoryPicture).subscribe(res => {
      this.initNewPicture();
      this.getCategoryPictures();
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
    return this.newCategoryPicture.name?.trim()
  }

  canCreatePicture() {
    return this.newPicture.id &&
      this.categoryPictures.find(c => c.id === this.newPicture.categoryId) &&
      this.newPicture.url &&
      this.fileToUpload;
  }

  deletePicture(p: Picture) {
    this.paintingApiService.delete(p.id).subscribe(res => {
      this.getPictures();
    }, err => {
      console.log(err);
    });
  }

  deleteCategoryPicture(c: CategoryPicture) {
    if (this.pictures.some(p => p.categoryId === c.id)) {
      this.toastService.error('Cette catégorie contient des peintures', 'Erreur');
    } else {
      this.categoryPaintingApiService.delete(c.id).subscribe(res => {
        this.getCategoryPictures();
      }, err => {
        console.log(err);
      });
    }
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.newPicture.url = this.fileToUpload.name;
  }
}
