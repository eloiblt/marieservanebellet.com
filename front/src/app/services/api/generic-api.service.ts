import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ToastService } from '../toast.service';
import { catchError, map, tap } from 'rxjs/operators';
import { NgHttpCachingHeaders } from 'ng-http-caching';
import { AuthService } from '../auth.service';

@Injectable()
export class GenericApiService<T> {
  protected apiUrl = environment.apiUrl;
  protected controllerName = '';

  constructor(
    protected http: HttpClient,
    protected toastService: ToastService,
    protected authService: AuthService
  ) {}

  get(): Observable<T[]> {
    return this.http.get<T[]>(
      this.apiUrl + this.controllerName,
      this.authService.isAuthenticated()
        ? {}
        : { headers: { [NgHttpCachingHeaders.ALLOW_CACHE]: '1' } }
    );
  }

  getById(id: string): Observable<T> {
    const endPoint = '/' + id;

    return this.http.get<T>(
      this.apiUrl + this.controllerName + endPoint,
      this.authService.isAuthenticated()
        ? {}
        : { headers: { [NgHttpCachingHeaders.ALLOW_CACHE]: '1' } }
    );
  }

  update(id: any, obj: any, notif = true): Observable<any> {
    const endPoint = '/' + id;

    return this.http
      .put<T>(this.apiUrl + this.controllerName + endPoint, obj)
      .pipe(
        tap((_) =>
          notif ? this.toastService.success('Mise à jour effectuée') : false
        ),
        catchError(async (_) =>
          this.toastService.error('Erreur lors de la mise à jour')
        )
      );
  }

  create(obj: any): Observable<any> {
    const endPoint = '/';

    return this.http
      .post<T>(this.apiUrl + this.controllerName + endPoint, obj)
      .pipe(
        map((res) => {
          this.toastService.success('Création effectuée');
          return res;
        }),
        catchError((err) => {
          this.toastService.error('Erreur lors de la création');
          return throwError(err);
        })
      );
  }

  delete(id: any): Observable<any> {
    const endPoint = '/' + id;

    return this.http.delete(this.apiUrl + this.controllerName + endPoint).pipe(
      map((res) => {
        this.toastService.success('Suppression effectuée');
        return res;
      }),
      catchError((err) => {
        this.toastService.error('Erreur lors de la suppression');
        return throwError(err);
      })
    );
  }
}
