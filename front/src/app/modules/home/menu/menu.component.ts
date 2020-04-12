import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PicturesApiService } from 'src/app/services/api/pictures-api.service';
import { forkJoin } from 'rxjs';
import { CategoryPicturesApiService } from 'src/app/services/api/categoryPictures-api.service';
import { Picture, CategoryPicture } from 'src/app/model/model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public picturesMenu: Picture[];
  public categoryPictures: CategoryPicture[];
  @Output()
  selectedCategory: EventEmitter<any> = new EventEmitter();

  constructor(
    private pictureApiService: PicturesApiService,
    private categoryPictureApiService: CategoryPicturesApiService
  ) { }

  ngOnInit(): void {
    this.getMenuPictures();
  }

  getMenuPictures() {
    forkJoin({
      picturesMenu: this.pictureApiService.getBySpec('Menu'),
      categoryPictures: this.categoryPictureApiService.get()
    }).subscribe(res => {
      this.picturesMenu = res.picturesMenu;
      this.categoryPictures = res.categoryPictures;
    });
  }

  getMenuName(categoryid: number) {
    return this.categoryPictures.find(c => c.id === categoryid).name;
  }

  select(categoryid: number) {
    this.selectedCategory.emit(this.categoryPictures.find(c => c.id === categoryid));
  }

}