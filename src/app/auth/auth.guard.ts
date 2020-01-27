import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateChild } from '@angular/router';
import { CanActivate } from '@angular/router/src/utils/preactivation';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;

  constructor( private authService: AuthService,
               private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      const url: string = state.url;

      return this.checkLogin(url);
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  checkLogin(url: string): boolean {
    if (!this.authService.authenticated) {
      // Store the attempted URL for redirecting
      this.authService.redirectUrl = url;
      this.authService.authState();
      return this.authService.authenticated;
    } else if (this.authService.authenticated) {
      return true;
    } else {
      this.router.navigate(['/sign-in']);
      return false;
    }
  }

}
