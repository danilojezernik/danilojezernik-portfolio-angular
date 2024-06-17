import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from "../../../../../services/api/users.service";
import { map } from "rxjs";
import { RouterLink } from "@angular/router";
import { GoBackComponent } from "../../../../../shared/components/go-back/go-back.component";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [ CommonModule, RouterLink, GoBackComponent ],
  templateUrl: './users.component.html'
})
export class UsersComponent {

  private _userService = inject(UsersService)

  users$ = this._userService.getAllUsersPublic().pipe(
    map(user => user.map(data => ({
      _id: data._id,
      username: data.username,
      datum_vnosa: data.datum_vnosa
    })))
  )

}
