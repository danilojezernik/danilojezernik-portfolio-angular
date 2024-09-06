import {Component, ElementRef, inject, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {AuthService} from "../../../../auth/auth.service";
import {Router} from "@angular/router";
import {HeroTitleComponent} from "../../../../shared/components/hero-title/hero-title.component";
import {TranslateModule} from "@ngx-translate/core";

/**
 * LoginComponent handles the user login process.
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HeroTitleComponent, TranslateModule],
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

  error = ''

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
        this.login(); // Trigger the login process
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
  login(): void {
    if (!this.getUsername || !this.getPassword) {
      this.error = 'errors.emptypass';
      return;
    }

    this._authService.login(this.getUsername, this.getPassword).subscribe(response => {
      if (response.access_token) {
        // Store the token
        this._authService.setAccessToken(response.access_token);

        // Check the user's role and navigate accordingly
        const userRole = this._authService.decodeRoleFromToken(); // Get role from the token
        if (userRole === 'admin') {
          this._router.navigate(['/admin']);
        } else if(userRole === 'visitor') {

          this._router.navigate(['/dashboard']);
        } else {
          this._router.navigate(['/not-authorized'])
        }

      } else {
        // Handle error or missing token scenario
        console.error('Login failed: Invalid response data.');
        this.error = 'errors.pass';
      }
    }, error => {
      // Handle HTTP error
      console.error('Login request failed', error);
      this.error = 'errors.pass';
    });
  }
}
