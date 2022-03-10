import { Injectable } from '@angular/core';
import {
  CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild,
} from '@angular/router';
import { AuthService } from './auth.service';

import { JwtTokenService } from './jwt-token.service';

@Injectable()
export class GuardService implements CanActivate, CanActivateChild {
  rolesKey;
  constructor(private router: Router, private jwtService: JwtTokenService,
    private authService: AuthService) {

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    try {
      if (this.jwtService.isExpiredToken(localStorage.getItem('access_token'))) {
        if (localStorage.getItem('access_token')) {
          this.authService.refreshToken().subscribe(() => {
          }, () => {
            this.authService.logout();
            return false;
          });
        } else {
          this.router.navigate(['/auth']);
        }
      }
      return true;
    } catch {
      this.router.navigate(['/auth']);
    }
  }

  canActivateChild(route: ActivatedRouteSnapshot) {
    try {
      if (this.jwtService.isExpiredToken(localStorage.getItem('access_token'))) {
        if (localStorage.getItem('access_token')) {
          this.authService.refreshToken().subscribe(() => {
          }, () => {
            this.authService.logout();
            return false;
          });
        } else {
          this.router.navigate(['/auth']);
        }
      }
      let role;
      const rolAuth = this.authService.getUserRoleLogin();

      for (let i = 0; i < rolAuth.length; i++) {
        if (rolAuth[i] !== 'offline_access' && rolAuth[i] !== 'uma_authorization') {
          role = rolAuth[i];
        }
      }
      if (route.data.rol[0] === role) {
        return true;
      } else {
        window.alert('Usuario no autorizado');
        this.router.navigate(['/auth']);
        return false;
      }
    } catch {
      this.router.navigate(['/auth']);
    }
  }
}
