import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GenericApiService } from './generic-api.service';
import { ToastService } from '../toast.service';

@Injectable({
  providedIn: 'root'
})
export class ContactApiService extends GenericApiService<any> {
  constructor(http: HttpClient, toastService: ToastService) {
    super(http, toastService);
    this.controllerName = 'contact';
  }

  contact(data: string): Observable<any> {
    const endPoint = '';

    return this.http.post(this.apiUrl + this.controllerName + endPoint, data);
  }
}
