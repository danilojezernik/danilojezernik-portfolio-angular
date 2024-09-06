import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../auth/auth.service";
import {LoggedInService} from "../../services/communication/logged-in.service";
import {Observable} from "rxjs";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {LOGIN_LOGOUT, MENU_TOP} from "../../shared/global-const/menu.const";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  constructor(public translate: TranslateService) {
    this.userRole = this._authService.decodeRoleFromToken(); // Get role from the token
    translate.setDefaultLang('en');
    translate.use('si');
  }

  // Injecting AuthService to handle authentication related operations
  private _authService = inject(AuthService);

  // Injecting LoggedInService to listen to log in status changes
  private _loggedInService = inject(LoggedInService);

  // Inject router to navigate to different routes
  private _router = inject(Router)

  // Observable to hold login status, will be populated in ngOnInit
  isLoggedIn$!: Observable<boolean>;
  userRole: string

  // Lifecycle hook that is called after the component's view has been initialized
  ngOnInit() {
    // Assign the Observable from LoggedInService to isLoggedIn$ to listen for login status changes
    this.isLoggedIn$ = this._loggedInService.isLoggedIn$;
  }

  // Method to log out the user
  logOut() {
    // Calls the AuthService's clear method to remove authentication details and update the login status
    this._authService.clear();
    // Redirect a user to login route when logout
    this._router.navigate(['/login']);
    this.userRole = ''
  }

  // Method to change the language of the application
  useLanguage(language: string): void {
    this.translate.use(language);
  }

  protected readonly LOGIN_LOGOUT = LOGIN_LOGOUT;
  protected readonly MENU_TOP = MENU_TOP;
  protected readonly localStorage = localStorage;
}
