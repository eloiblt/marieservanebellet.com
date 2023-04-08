import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenericApiService } from './generic-api.service';
import { Picture } from 'src/app/model/model';
import { ToastService } from '../toast.service';

@Injectable({
  providedIn: 'root'
})
export class PicturesApiService extends GenericApiService<Picture> {
  constructor(http: HttpClient, toastService: ToastService) {
    super(http, toastService);
    this.controllerName = 'picture';
  }

  getMenuPictures(): Observable<Picture[]> {
    const endPoint = '/menu';
    return this.http.get<Picture[]>(this.apiUrl + this.controllerName + endPoint);
  }

  getByCategory(categoryId: number): Observable<Picture[]> {
    const endPoint = '/category/' + categoryId;
    return this.http.get<Picture[]>(this.apiUrl + this.controllerName + endPoint);
  }

  postFile(fileToUpload: File): Observable<any> {
    const endPoint = '/postFile';
    const formData: FormData = new FormData();
    formData.append('peinture', fileToUpload, fileToUpload.name);
    return this.http.post(this.apiUrl + this.controllerName + endPoint, formData);
  }
}
