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
    this.controllerName = 'pictures';
  }

  getBySpec(spec: string): Observable<Picture[]> {
    const endPoint = '/getBySpec?spec=' + spec;

    return this.http.get<Picture[]>(this.apiUrl + this.controllerName + endPoint);
  }
}
