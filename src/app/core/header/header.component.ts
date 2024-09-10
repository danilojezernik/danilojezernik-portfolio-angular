import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../auth/auth.service";
import {LoggedInService} from "../../services/communication/logged-in.service";
import {Observable, Subscription} from "rxjs";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {LOGIN_LOGOUT, MENU_TOP} from "../../shared/global-const/menu.const";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor(public translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('si');
  }

  // Injecting AuthService to handle authentication related operations
  private _authService = inject(AuthService);

  // Injecting LoggedInService to listen to log in status changes
  private _loggedInService = inject(LoggedInService);
  private userRoleSubscription!: Subscription;

  // Inject router to navigate to different routes
  private _router = inject(Router)

  // Observable to hold login status, will be populated in ngOnInit
  isLoggedIn$!: Observable<boolean>;
  userRole: string

  // Lifecycle hook that is called after the component's view has been initialized
  ngOnInit() {

    // Assign the Observable from LoggedInService to isLoggedIn$ to listen for login status changes
    this.isLoggedIn$ = this._loggedInService.isLoggedIn$;
    // Update userRole based on login status
    this.userRoleSubscription = this.isLoggedIn$.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.userRole = this._authService.decodeRoleFromToken();
      } else {
        this.userRole = '';  // Clear the role on logout
      }
    });
  }

  // Method to log out the user
  logOut() {
    // Calls the AuthService's clear method to remove authentication details and update the login status
    this._authService.clear();
    // Redirect a user to login route when logout
    this._router.navigate(['/login']);
  }

  // Method to change the language of the application
  useLanguage(language: string): void {
    this.translate.use(language);
  }

  ngOnDestroy() {
    if (this.userRoleSubscription) {
      this.userRoleSubscription.unsubscribe();
    }
  }

  protected readonly LOGIN_LOGOUT = LOGIN_LOGOUT;
  protected readonly MENU_TOP = MENU_TOP;
  protected readonly localStorage = localStorage;
}
