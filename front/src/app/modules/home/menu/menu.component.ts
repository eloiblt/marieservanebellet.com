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
    this.categoryPictureApiService.get().subscribe(res => {
      this.categoryPictures = res;
      this.loading = false;
    });
  }

  getMenuTitle(categoryId: number) {
    return this.categoryPictures.find(c => c.id === categoryId).title;
  }

  loaded(id: number) {
    this.show = [...this.show, id];
  }

  isLoaded(id: number) {
    return this.show.includes(id);
  }

}
