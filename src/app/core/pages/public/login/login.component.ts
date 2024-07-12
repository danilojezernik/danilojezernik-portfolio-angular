import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { AuthService } from "../../../../auth/auth.service";
import { Router } from "@angular/router";
import { LogFrontendService } from "../../../../services/api/log-frontend.service";

/**
 * LoginComponent handles the user login process.
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  /**
   * Injected services:
   * @private _authService: Service for handling authentication
   * @private _logService: Service for logging frontend events
   * @private _router: Service for navigation
   */
  private _authService = inject(AuthService);
  private _logService = inject(LogFrontendService);
  private _router = inject(Router);

  /**
   * Element references for input fields
   * @ViewChild firstInput: Reference to the first input field (username)
   * @ViewChild secondInput: Reference to the second input field (password)
   */
  @ViewChild('firstInput') firstInput!: ElementRef;
  @ViewChild('secondInput') secondInput!: ElementRef;

  /**
   * Variables to store user input
   * @property getUsername: Stores the entered username
   * @property getPassword: Stores the entered password
   */
  getUsername = '';
  getPassword = '';

  /**
   * Handles the Enter key event to move between inputs or trigger login
   *
   * If the Enter key is pressed in the first input, focus moves to the second input.
   * If the Enter key is pressed in the second input, the logIn method is called.
   * @param event
   * @param inputName
   */
  checkEnter(event: KeyboardEvent, inputName: string) {
    if (event.key === 'Enter') {
      if (inputName === 'firstInput') {
        this.secondInput.nativeElement.focus(); // Move focus to the password input field
      } else if (inputName === 'secondInput') {
        this.logIn(); // Trigger the login process
      }
    }
  }

  /**
   * Handles the login process.
   *
   * Calls the AuthService to log in the user with the provided credentials.
   * On success, stores the access token, logs the event, and navigates to the admin page.
   * On failure, logs the error message.
   */
  logIn() {
    this._authService.login(this.getUsername, this.getPassword)
      .subscribe((response) => {
        this._authService.setAccessToken(response.access_token); // Store the access token
        this._logService.sendPublicLog('Login is checked', 'PUBLIC'); // Log the login attempt
        this._router.navigate([ 'admin' ]); // Navigate to the admin page
      }, error => {
        console.log('Login failed', error); // Log the error to the console
        this._logService.sendPublicLog(`Error: Login failed: ` + error.message, 'PUBLIC'); // Log the error message
      });
  }
}
