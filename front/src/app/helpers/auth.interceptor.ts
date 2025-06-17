import {
  HttpEvent,
  HttpHandlerFn,
  HttpHeaders,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tokenGetter } from '../services/auth.service';

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const token = tokenGetter();

  if (!token) {
    return next(req);
  }

  const newReq = req.clone({
    headers: new HttpHeaders({
      Authorization: `Bearer ${token}`,
    }),
  });

  return next(newReq);
}
