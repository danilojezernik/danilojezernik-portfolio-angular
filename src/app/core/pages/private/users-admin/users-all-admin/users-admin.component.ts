import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from "../../../../../services/api/users.service";
import { GoBackComponent } from "../../../../../shared/components/go-back/go-back.component";

@Component({
  selector: 'app-users-admin',
  standalone: true,
  imports: [ CommonModule, GoBackComponent ],
  templateUrl: './users-admin.component.html'
})
export class UsersAdminComponent {


  private _userService = inject(UsersService)

  users$ = this._userService.getAllUsersPrivate()
}
