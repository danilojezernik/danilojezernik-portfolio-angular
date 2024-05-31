import {Injectable} from '@angular/core';
import {AuthService} from "./auth.service";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {
  }

  // Implementing CanActivate interface method
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return this.authGuard() // Calls the private authGuard method
  }

  // Private method to handle authentication logic
  private async authGuard(): Promise<boolean> {
    const token = this.auth.getAccessToken(); // Retrieve the access token
    // If no token, redirect to log in and resolve to false
    if (!token) {
      await this.router.navigate(['/login']);
      return Promise.resolve(false);
    }

    // Resolve to true if token exists (user is authenticated)
    return Promise.resolve(true);
  }

}
