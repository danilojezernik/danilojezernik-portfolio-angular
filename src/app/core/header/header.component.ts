import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import { AuthService } from "../../auth/auth.service";
import { LoggedInService } from "../../services/communication/logged-in.service";
import { Observable } from "rxjs";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ CommonModule, RouterLink ],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {

  // Injecting AuthService to handle authentication related operations
  private _authService = inject(AuthService);

  // Injecting LoggedInService to listen to login status changes
  private _loggedInService = inject(LoggedInService);

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
  }
}
