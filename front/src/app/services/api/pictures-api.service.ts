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

  getByCategory(categoryId: number): Observable<Picture[]> {
    const endPoint = '/category/' + categoryId;
    return this.http.get<Picture[]>(this.apiUrl + this.controllerName + endPoint);
  }

  postFile(fileToUpload: File, fileName: string): Observable<any> {
    const endPoint = '/upload';
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileName);
    return this.http.post(this.apiUrl + this.controllerName + endPoint, formData);
  }
}
