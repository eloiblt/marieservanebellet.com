import { Component, OnInit } from '@angular/core';
import { Picture, CategoryPicture as CategoryPicture } from 'src/app/model/model';
import { PicturesApiService } from 'src/app/services/api/pictures-api.service';
import { CategoryPicturesApiService } from 'src/app/services/api/categoryPictures-api.service';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.scss']
})
export class ManagementComponent implements OnInit {

  public newPicture: Picture;
  public pictures: Picture[];
  public categoryPictures: CategoryPicture[];

  constructor(
    private paintingApiService: PicturesApiService,
    private categoryPaintingApiService: CategoryPicturesApiService
  ) { }

  ngOnInit(): void {
    this.initNewPicture();
    this.getPictures();
    this.getCategoryPictures();
  }

  initNewPicture() {
    this.newPicture = new Picture();
    this.newPicture.title = '';
    this.newPicture.technique = '';
    this.newPicture.gridColumn = '';
    this.newPicture.gridrow = '';
    this.newPicture.categoryId = null;
    this.newPicture.shape = '';
    this.newPicture.spec = '';
    this.newPicture.date = '';
    this.newPicture.url = '';
    this.newPicture.size = '';
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
    }, err => {
      console.log(err);
    });
  }

  createNewPicture() {
    if (this.canCreate()) {
      this.paintingApiService.create(this.newPicture).subscribe(res => {
        this.initNewPicture();
        this.getPictures();
      }, err => {
        console.log(err);
      });
    }
  }

  update(p: Picture) {
    this.paintingApiService.update(p.id, p).subscribe(res => {
    }, err => {
      console.log(err);
    });
  }

  canCreate() {
    return this.newPicture.id &&
      this.newPicture.title &&
      (this.newPicture.categoryId ? this.categoryPictures.find(c => c.id === this.newPicture.categoryId) : true) &&
      this.newPicture.url;
  }
}
