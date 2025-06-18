import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Picture } from '../../model/model';
import { GenericApiService } from './generic.api-service';

@Injectable({
  providedIn: 'root',
})
export class PicturesApiService extends GenericApiService<Picture> {
  constructor() {
    super();
    this.controllerName = 'picture';
  }

  getByCategory(categoryId: number): Observable<Picture[]> {
    const endPoint = `/category/${categoryId}`;
    return this.http.get<Picture[]>(
      this.apiUrl + this.controllerName + endPoint,
      {},
    );
  }

  postFile(fileToUpload: File, fileName: string) {
    const endPoint = '/upload';
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileName);
    return this.http.post(
      this.apiUrl + this.controllerName + endPoint,
      formData,
    );
  }
}
