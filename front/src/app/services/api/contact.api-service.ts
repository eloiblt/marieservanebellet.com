import { Injectable } from '@angular/core';
import { GenericApiService } from './generic.api-service';

@Injectable({
  providedIn: 'root',
})
export class ContactApiService extends GenericApiService<never> {
  constructor() {
    super();
    this.controllerName = 'contact';
  }

  contact(data: string) {
    const endPoint = '';

    return this.http.post(this.apiUrl + this.controllerName + endPoint, data);
  }
}
