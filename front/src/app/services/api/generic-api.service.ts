import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ToastService } from '../toast.service';
import { catchError, map } from 'rxjs/operators';

@Injectable()
export class GenericApiService<T> {
  protected apiUrl = environment.apiUrl;
  protected controllerName = '';

  constructor(
    protected http: HttpClient,
    protected toastService: ToastService
  ) {
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

  update(id: any, obj: any): Observable<any> {
    const endPoint = '/' + id;

    return this.http
      .put<T>(this.apiUrl + this.controllerName + endPoint, obj)
      .pipe(
        map(res => {
          this.toastService.success('Mise à jour effectuée');
          return res;
        }),
        catchError(err => {
          this.toastService.error('Erreur lors de la mise à jour');
          return throwError(err);
        })
      );
  }

  create(obj: any): Observable<any> {
    const endPoint = '/';

    return this.http
      .post<T>(this.apiUrl + this.controllerName + endPoint, obj)
      .pipe(
        map(res => {
          this.toastService.success('Création effectuée');
          return res;
        }),
        catchError(err => {
          this.toastService.error('Erreur lors de la création');
          return throwError(err);
        })
      );
  }

  delete(id: any): Observable<any> {
    const endPoint = '/' + id;

    return this.http
      .delete(this.apiUrl + this.controllerName + endPoint)
      .pipe(
        map(res => {
          this.toastService.success('Suppression effectuée');
          return res;
        }),
        catchError(err => {
          this.toastService.error('Erreur lors de la suppression');
          return throwError(err);
        })
      );
  }
}
