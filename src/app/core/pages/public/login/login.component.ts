import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { AuthService } from "../../../../auth/auth.service";
import { Router } from "@angular/router";
import { LogFrontendService } from "../../../../services/api/log-frontend.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  private _authService = inject(AuthService)
  private _logService = inject(LogFrontendService)
  private _router = inject(Router)

  @ViewChild('firstInput') firstInput!: ElementRef<any>
  @ViewChild('secondInput') secondInput!: ElementRef<any>

  getUsername = ''
  getPassword = ''


  /**
   * If user is in first input and when he types in username, he can hit enter, and it will move him to the second field
   * where he can type in his password and when he hits enter this time, he is logged in
   */
  checkEnter(event: KeyboardEvent, inputName: string) {
    if (event.key === 'Enter') {
      if (inputName === 'firstInput') {
        this.secondInput.nativeElement.focus()
      } else if (inputName === 'secondInput') {
        this.logIn()
      }
    }
  }

  logIn() {
    this._authService.login(this.getUsername, this.getPassword)
      .subscribe((response) => {
        this._authService.setAccessToken(response.access_token)
        this._logService.sendPublicLog('Login is checked', 'PUBLIC')
        this._router.navigate([ 'admin' ])
      }, error => {
        console.log('Login failed', error)
        this._logService.sendPublicLog(`Error: Login failed: ` + error.message, 'PUBLIC')
      })
  }
}
