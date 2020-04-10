import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private jwtHelper = new JwtHelperService();

  public isAuthenticated(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    return !this.jwtHelper.isTokenExpired(user.token);
  }
}
