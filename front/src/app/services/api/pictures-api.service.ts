import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenericApiService } from './generic-api.service';
import { Picture } from 'src/app/model/model';
import { ToastService } from '../toast.service';
import { NgHttpCachingHeaders } from 'ng-http-caching';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class PicturesApiService extends GenericApiService<Picture> {
  constructor(http: HttpClient, toastService: ToastService, authService: AuthService) {
    super(http, toastService, authService);
    this.controllerName = 'picture';
  }

  getByCategory(categoryId: number): Observable<Picture[]> {
    const endPoint = '/category/' + categoryId;
    return this.http.get<Picture[]>(
      this.apiUrl + this.controllerName + endPoint,
      this.authService.isAuthenticated()
        ? {}
        : { headers: { [NgHttpCachingHeaders.ALLOW_CACHE]: '1' } }
    );
  }

  postFile(fileToUpload: File, fileName: string): Observable<any> {
    const endPoint = '/upload';
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileName);
    return this.http.post(
      this.apiUrl + this.controllerName + endPoint,
      formData
    );
  }
}
