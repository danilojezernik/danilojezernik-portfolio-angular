import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CopyrightDirective} from "../../directives/copyright.directive";
import {TranslateModule} from "@ngx-translate/core";
import {RouterLink} from "@angular/router";
import {MENU_TOP} from "../../shared/global-const/menu.const";
import {Observable, Subscription} from "rxjs";
import {LoggedInService} from "../../services/communication/logged-in.service";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, CopyrightDirective, TranslateModule, RouterLink],
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit, OnDestroy {

  private _authService = inject(AuthService);
  private _loggedInService = inject(LoggedInService);
  private userRoleSubscription!: Subscription;

  // Observable to hold login status, will be populated in ngOnInit
  isLoggedIn$!: Observable<boolean>;
  userRole: string

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
  ngOnDestroy() {
    if (this.userRoleSubscription) {
      this.userRoleSubscription.unsubscribe();
    }
  }
  protected readonly MENU_TOP = MENU_TOP;
}
