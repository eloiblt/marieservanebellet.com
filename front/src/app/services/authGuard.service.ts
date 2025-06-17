import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
class AuthGuardService {
  public auth: AuthService = inject(AuthService);
  public router: Router = inject(Router);

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      void this.router.navigate(['adminLogin']);
      return false;
    }
    return true;
  }
}

export const AuthGuard: CanActivateFn = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: ActivatedRouteSnapshot,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  state: RouterStateSnapshot,
): boolean => {
  return inject(AuthGuardService).canActivate();
};
