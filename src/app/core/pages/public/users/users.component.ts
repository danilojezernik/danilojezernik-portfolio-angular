import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from "../../../../services/api/users.service";
import { map } from "rxjs";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './users.component.html'
})
export class UsersComponent {

  private _userService = inject(UsersService)

  users$ = this._userService.getAllUsers().pipe(
    map(user => user.map(data => ({
      username: data.username,
      datum_vnosa: data.datum_vnosa
    })))
  )

}
