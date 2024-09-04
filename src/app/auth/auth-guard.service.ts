import { inject, Injectable } from '@angular/core';
import { AuthService } from "./auth.service";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
} from "@angular/router";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  private _auth = inject(AuthService)
  private _router = inject(Router)

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.authGuard(route)
  }

  private authGuard(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this._auth.getUserRoleObservable().pipe(
      map(role => {
        const token = this._auth.getAccessToken()
        // If no token, redirect to log in and return false
        if (!token) {
          this._router.navigate(['/login'])
          return false
        }

        // Check user role and determine if access is granted
        const allowedRoles = route.data['roles'] as Array<string>
        if (allowedRoles && !allowedRoles.includes(role)) {
          this._router.navigate(['/dashboard'])
          return false
        }

        return true
      })
    )
  }

}
