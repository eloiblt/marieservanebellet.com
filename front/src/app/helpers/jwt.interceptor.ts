import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      req = req.clone({
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + user.token
        })
      });
    }

    return next.handle(req);
  }
}
