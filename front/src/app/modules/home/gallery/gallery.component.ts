import { Component, OnInit } from '@angular/core';
import { CategoryPicture, Picture } from 'src/app/model/model';
import { forkJoin } from 'rxjs';
import { CategoryPicturesApiService } from 'src/app/services/api/categoryPictures-api.service';
import { PicturesApiService } from 'src/app/services/api/pictures-api.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  public selectedCategory: CategoryPicture;
  public pictures: Picture[];
  public categoryPictures: CategoryPicture[];
  public dataReceived = false;
  public picturesMenu: Picture[];
  public paintingsByCategory: Picture[];

  constructor(
    private pictureApiService: PicturesApiService,
    private categoryPictureApiService: CategoryPicturesApiService
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    forkJoin({
      pictures: this.pictureApiService.get(),
      categoryPictures: this.categoryPictureApiService.get()
    }).subscribe(res => {
      this.pictures = res.pictures;
      this.categoryPictures = res.categoryPictures;
      this.dataReceived = true;

      this.picturesMenu = this.pictures.filter(p => p.spec === 'Menu');
    });
  }

  setCategory(c: CategoryPicture) {
    this.selectedCategory = c;
    this.paintingsByCategory = this.pictures.filter(p => p.categoryId === c.id);
  }

  clearCategory() {
    this.selectedCategory = null;
  }

}
