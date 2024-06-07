import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { AuthService } from "../../../../auth/auth.service";
import { Router } from "@angular/router";
import { LoginService } from "../../../../services/api/login.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  private _authService = inject(AuthService)
  private _logService = inject(LoginService)
  private _router = inject(Router)

  getUsername = ''
  getPassword = ''

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
