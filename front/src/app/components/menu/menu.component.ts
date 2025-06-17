import { Component, inject, OnInit } from '@angular/core';
import { CategoryPicture } from '../../model/model';
import { RouterLink } from '@angular/router';
import { PictureComponent } from '../picture/picture.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CategoryPicturesApiService } from '../../services/api/category-pictures.api-service';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  imports: [RouterLink, PictureComponent, FontAwesomeModule],
})
export class MenuComponent implements OnInit {
  public categoryPictures: (CategoryPicture | null)[] = [];
  public loadedImagesIds: number[] = [];
  faArrowRight = faArrowRight;

  private readonly categoryPictureApiService: CategoryPicturesApiService =
    inject(CategoryPicturesApiService);

  ngOnInit() {
    this.categoryPictures = Array(6).fill(null);

    this.loadedImagesIds = [];
    this.categoryPictureApiService.get().subscribe((res) => {
      this.categoryPictures = res;
    });
  }

  loaded(id: number | undefined): void {
    if (!id) return;
    this.loadedImagesIds = [...this.loadedImagesIds, id];
  }

  isLoaded(id: number | undefined) {
    if (!id) return false;
    return this.loadedImagesIds.includes(id);
  }
}
