import { Observable, throwError } from 'rxjs';
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, map, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class GenericApiService<T> {
  protected apiUrl = environment.apiUrl;
  protected controllerName!: string;

  protected http: HttpClient = inject(HttpClient);
  protected toastrService: ToastrService = inject(ToastrService);

  get(): Observable<T[]> {
    return this.http.get<T[]>(this.apiUrl + this.controllerName, {});
  }

  update(id: number, obj: unknown, notif = true) {
    const endPoint = `/${id}`;

    return this.http
      .put<T>(this.apiUrl + this.controllerName + endPoint, obj)
      .pipe(
        tap(() =>
          notif ? this.toastrService.success('Mise à jour effectuée') : false,
        ),
        catchError(async () =>
          this.toastrService.error('Erreur lors de la mise à jour'),
        ),
      );
  }

  create(obj: unknown) {
    const endPoint = '/';

    return this.http
      .post<T>(this.apiUrl + this.controllerName + endPoint, obj)
      .pipe(
        map((res) => {
          this.toastrService.success('Création effectuée');
          return res;
        }),
        catchError((err) => {
          this.toastrService.error('Erreur lors de la création');
          return throwError(() => err);
        }),
      );
  }

  delete(id: number) {
    const endPoint = `/${id}`;

    return this.http.delete(this.apiUrl + this.controllerName + endPoint).pipe(
      map((res) => {
        this.toastrService.success('Suppression effectuée');
        return res;
      }),
      catchError((err) => {
        this.toastrService.error('Erreur lors de la suppression');
        return throwError(() => err);
      }),
    );
  }
}
