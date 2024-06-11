import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from "../../../../../services/api/users.service";
import { GoBackComponent } from "../../../../../shared/components/go-back/go-back.component";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-users-admin',
  standalone: true,
  imports: [ CommonModule, GoBackComponent, RouterLink ],
  templateUrl: './users-all-admin.component.html'
})
export class UsersAllAdminComponent {


  private _userService = inject(UsersService)

  users$ = this._userService.getAllUsersPrivate()
}
