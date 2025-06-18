import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly jwtHelper = new JwtHelperService();

  public isAuthenticated(): boolean {
    const token = tokenGetter();
    return !!token && !this.jwtHelper.isTokenExpired(token);
  }
}

export function tokenGetter() {
  const platformId = inject(PLATFORM_ID);

  if (isPlatformBrowser(platformId)) {
    return localStorage.getItem('token');
  }

  return '';
}
