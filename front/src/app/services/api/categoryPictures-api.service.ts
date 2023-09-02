import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericApiService } from './generic-api.service';
import { CategoryPicture } from 'src/app/model/model';
import { ToastService } from '../toast.service';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryPicturesApiService extends GenericApiService<CategoryPicture> {
  constructor(http: HttpClient, toastService: ToastService, authService: AuthService) {
    super(http, toastService, authService);
    this.controllerName = 'category';
  }
}
