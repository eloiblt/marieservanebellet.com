import { Component, OnInit, Output, EventEmitter, Input, OnChanges } from '@angular/core';
import { Picture, CategoryPicture } from 'src/app/model/model';
import { PicturesApiService } from 'src/app/services/api/pictures-api.service';
import { CategoryPicturesApiService } from 'src/app/services/api/categoryPictures-api.service';
import { forkJoin } from 'rxjs/internal/observable/forkJoin';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public picturesMenu: Picture[];
  public categoryPictures: CategoryPicture[];
  public loading = true;
  public picturesPath = '../../../../assets/pictures/';
  public show = false;
  public cptLoaded = 0;

  constructor(
    private pictureApiService: PicturesApiService,
    private categoryPictureApiService: CategoryPicturesApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    forkJoin({
      pictures: this.pictureApiService.getBySpec('Menu'),
      categoryPictures: this.categoryPictureApiService.get()
    }).subscribe(res => {
      this.picturesMenu = res.pictures;
      this.categoryPictures = res.categoryPictures;
      this.loading = false;
    });
  }

  getMenuName(categoryid: number) {
    return this.categoryPictures.find(c => c.id === categoryid).name;
  }

  select(categoryid: number) {
    console.log(this.categoryPictures.find(c => c.id === categoryid).name);
    switch (this.categoryPictures.find(c => c.id === categoryid).name) {
      case 'Paysages anglais':
        console.log('angleterre');
        this.router.navigate(['/gallery/angleterre']);
        break;
      case 'Saint-Malo':
        console.log('saint-malo');
        this.router.navigate(['/gallery/saint-malo']);
        break;
    }
  }

  loaded() {
    this.cptLoaded++;
    if (this.cptLoaded === this.picturesMenu.length) {
      this.show = true;
    }
  }

}
