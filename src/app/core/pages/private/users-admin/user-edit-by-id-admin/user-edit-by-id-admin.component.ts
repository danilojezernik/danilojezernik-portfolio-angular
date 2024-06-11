import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from "../../../../../services/api/users.service";
import { ActivatedRoute } from "@angular/router";
import { map } from "rxjs";

@Component({
  selector: 'app-user-edit-by-id-admin',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './user-edit-by-id-admin.component.html'
})
export class UserEditByIdAdminComponent implements OnInit {

  private _userService = inject(UsersService)
  private _route = inject(ActivatedRoute)

  changeFullName: string = ''
  changeUsername: string = ''
  changeEmail: string = ''
  changeProfession: string = ''
  changeTechnology: string = ''
  changeDescription: string = ''
  changeConfirmed?: boolean
  changeRegistered?: boolean

  ngOnInit() {

    const userId = this._route.snapshot.paramMap.get('id') || ''

    this._userService.getUserByIdAdmin(userId).pipe(
      map(data => {
        this.changeFullName = data.full_name
        this.changeUsername = data.username
        this.changeEmail = data.username
        this.changeDescription = data.description
        this.changeProfession = data.description
        this.changeTechnology = data.technology
        this.changeConfirmed = data.confirmed
        this.changeRegistered = data.registered
      })
    )
  }

  editUser(id: string) {

  }
}
