import {inject, Injectable} from '@angular/core';
import {AuthService} from "./auth.service";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  private _auth = inject(AuthService);
  private _router = inject(Router);

  canActivate(route: ActivatedRouteSnapshot): boolean {
    return this.authGuard(route);
  }

  private authGuard(route: ActivatedRouteSnapshot): boolean {
    const token = this._auth.getAccessToken();
    const userRole = this._auth.decodeRoleFromToken();

    if (!token) {
      this._router.navigate(['/login']);
      return false;
    }

    const requiredRoles = route.data['roles'] as Array<string>;

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    if (requiredRoles.includes(userRole)) {
      return true;
    }

    // If the user doesn't have the required role, redirect to "not-authorized"
    this._router.navigate(['/not-authorized']);
    return false;
  }
}
