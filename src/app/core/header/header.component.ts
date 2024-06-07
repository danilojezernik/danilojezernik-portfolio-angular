import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import { AuthService } from "../../auth/auth.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ CommonModule, RouterLink ],
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  private _authService = inject(AuthService)

  // Variable to hold login status
  isLoggedIn: boolean = false;

  logOut() {
    this._authService.clear();
  }
}
