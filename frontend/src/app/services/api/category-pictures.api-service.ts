import { Injectable } from '@angular/core';
import { GenericApiService } from './generic.api-service';
import { CategoryPicture } from '../../model/model';

@Injectable({
  providedIn: 'root',
})
export class CategoryPicturesApiService extends GenericApiService<CategoryPicture> {
  constructor() {
    super();
    this.controllerName = 'category';
  }
}
