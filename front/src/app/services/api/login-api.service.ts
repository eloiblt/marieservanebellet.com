import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenericApiService } from './generic-api.service';

@Injectable({
  providedIn: 'root'
})
export class LoginApiService extends GenericApiService<any> {
  constructor(http: HttpClient) {
    super(http);
    this.controllerName = 'login';
  }

  login(data: string): Observable<any> {
    const endPoint = '';

    return this.http.post(this.apiUrl + this.controllerName + endPoint, data);
  }
}
