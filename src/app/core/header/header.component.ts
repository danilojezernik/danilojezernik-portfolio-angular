import {Component, ElementRef, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterLink} from "@angular/router";
import {AuthService} from "../../auth/auth.service";
import {LoggedInService} from "../../services/communication/logged-in.service";
import {Observable} from "rxjs";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {DROPDOWN, LANGUAGE, MENU, TRANSLATE_LANGUAGE} from "../../shared/global-const/global.const";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  private _el = inject(ElementRef)

  constructor(public translate: TranslateService) {
    translate.setDefaultLang('en');
    translate.use('en');
  }

  // Injecting AuthService to handle authentication related operations
  private _authService = inject(AuthService);

  // Injecting LoggedInService to listen to log in status changes
  private _loggedInService = inject(LoggedInService);

  // Inject router to navigate to different routes
  private _router = inject(Router)

  // Observable to hold login status, will be populated in ngOnInit
  isLoggedIn$!: Observable<boolean>;

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
  }

  // Method to change the language of the application
  useLanguage(language: string): void {
    this.translate.use(language);
  }

  toggleMegaMenu() {
    const menu = this._el.nativeElement.querySelector(`mega-menu-full`)
    if(menu)
      menu.classList.toggle('hidden');
  }

  toggleMegaMenuDropdown() {
    const dropDown = this._el.nativeElement.querySelector(`mega-menu-full-dropdown`)
    if(dropDown)
      dropDown.classList.toggle('hidden');
  }

  get firstColumnItems() {
    return this.DROPDOWN.slice(0, 3)
  }

  get secondColumnItems() {
    return this.DROPDOWN.slice(3)
  }

  protected readonly MENU = MENU;
  protected readonly TRANSLATE_LANGUAGE = TRANSLATE_LANGUAGE;
  protected readonly LANGUAGE = LANGUAGE;
  protected readonly DROPDOWN = DROPDOWN;
}
