import { Component, OnInit } from '@angular/core';
import { CategoryPicture } from 'src/app/model/model';
import { CategoryPicturesApiService } from 'src/app/services/api/categoryPictures-api.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  public categoryPictures: CategoryPicture[];
  public loadedImagesIds = [];

  constructor(private categoryPictureApiService: CategoryPicturesApiService) {}

  ngOnInit(): void {
    this.categoryPictures = [].constructor(6);

    this.loadedImagesIds = [];
    this.categoryPictureApiService.get().subscribe((res) => {
      this.categoryPictures = res;
    });
  }

  loaded(id: number) {
    this.loadedImagesIds = [...this.loadedImagesIds, id];
  }

  isLoaded(id: number) {
    return this.loadedImagesIds.includes(id);
  }
}
