import {Component, inject, OnInit} from '@angular/core';
import {initFlowbite} from "flowbite";
import {AuthService} from "./auth/auth.service";
import {Observable, Subscription} from "rxjs";
import {LoggedInService} from "./services/communication/logged-in.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private _loggedInService = inject(LoggedInService);
  private _authService = inject(AuthService);
  isDrawerOpen = false

  isLoggedIn$!: Observable<boolean>;
  userRole: string
  private userRoleSubscription!: Subscription;

  ngOnInit(): void {
    initFlowbite();
    this.isLoggedIn$ = this._loggedInService.isLoggedIn$;

    this.userRoleSubscription = this.isLoggedIn$.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.userRole = this._authService.decodeRoleFromToken();
      } else {
        this.userRole = '';  // Clear the role on logout
      }
    });
  }

  toggleDrawer() {
    this.isDrawerOpen = !this.isDrawerOpen

  }
}
