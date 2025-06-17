import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericApiService } from './generic.api-service';

@Injectable({
  providedIn: 'root',
})
export class LoginApiService extends GenericApiService<LoginApiService> {
  constructor() {
    super();
    this.controllerName = 'login';
  }

  login(data: unknown): Observable<string> {
    const endPoint = '';

    return this.http.post(this.apiUrl + this.controllerName + endPoint, data, {
      responseType: 'text',
    });
  }
}
