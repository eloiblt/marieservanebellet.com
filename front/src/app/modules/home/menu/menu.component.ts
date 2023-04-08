import { Component, OnInit } from '@angular/core';
import { Picture, CategoryPicture } from 'src/app/model/model';
import { PicturesApiService } from 'src/app/services/api/pictures-api.service';
import { CategoryPicturesApiService } from 'src/app/services/api/categoryPictures-api.service';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public picturesMenu: Picture[];
  public categoryPictures: CategoryPicture[];
  public loading = true;
  public show = [];
  public cptLoaded = 0;
  public environment = environment;

  constructor(
    private pictureApiService: PicturesApiService,
    private categoryPictureApiService: CategoryPicturesApiService,
  ) { }

  ngOnInit(): void {
    this.show = [];
    forkJoin({
      pictures: this.pictureApiService.getMenuPictures(),
      categoryPictures: this.categoryPictureApiService.get()
    }).subscribe(res => {
      this.picturesMenu = res.pictures;
      this.categoryPictures = res.categoryPictures;
      this.loading = false;
    });
  }

  getMenuTitle(categoryid: number) {
    return this.categoryPictures.find(c => c.id === categoryid).title;
  }

  loaded(id: number) {
    this.show = [...this.show, id];
  }

  isLoaded(id: number) {
    return this.show.includes(id);
  }

}
