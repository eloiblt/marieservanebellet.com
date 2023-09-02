import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenericApiService } from './generic-api.service';
import { ToastService } from '../toast.service';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginApiService extends GenericApiService<any> {
  constructor(http: HttpClient, toastService: ToastService, authService: AuthService) {
    super(http, toastService, authService);
    this.controllerName = 'login';
  }

  login(data: string): Observable<any> {
    const endPoint = '';

    return this.http.post(this.apiUrl + this.controllerName + endPoint, data, { responseType: 'text' });
  }
}
