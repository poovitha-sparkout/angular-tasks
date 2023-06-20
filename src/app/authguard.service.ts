import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ): Observable<boolean> | Promise<boolean> {
  //   return this.authService.isAuthenticated().then((authenticated) => {
  //     console.log(authenticated);
  //     if (authenticated) {
  //       return true;
  //     } else {
  //       this.router.navigate(['/login']);
  //       return false;
  //     }
  //   });
  // }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService
      .isAuthenticated()
      .then((authenticated) => {
        if (authenticated) {
          return true;
        } else {
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1000);

          return false;
        }
      })
      .catch(() => {
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);

        return false;
      });
  }
}