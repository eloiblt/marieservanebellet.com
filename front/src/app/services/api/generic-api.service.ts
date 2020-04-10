import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable()
export class GenericApiService<T> {
  protected apiUrl = environment.apiUrl + '/';
  protected controllerName = '';

  constructor(protected http: HttpClient) {
  }

  get(): Observable<T[]> {
    return this.http
      .get<T[]>(this.apiUrl + this.controllerName);
  }

  getById(id: string): Observable<T> {
    const endPoint = '/' + id;

    return this.http
      .get<T>(this.apiUrl + this.controllerName + endPoint);
  }

  update(id: any, obj: any, ): Observable<any> {
    const endPoint = '/' + id;

    return this.http
      .put<T>(this.apiUrl + this.controllerName + endPoint, obj);
  }

  create(obj: any): Observable<T> {
    const endPoint = '/';

    return this.http
      .post<T>(this.apiUrl + this.controllerName + endPoint, obj);
  }

  delete(id: any): Observable<any> {
    const endPoint = '/' + id;

    return this.http
      .delete(this.apiUrl + this.controllerName + endPoint);
  }
}
