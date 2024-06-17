import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from "../../../../../services/api/users.service";
import { ActivatedRoute, Router } from "@angular/router";
import { map } from "rxjs";
import { User } from "../../../../../models/user";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-user-edit-by-id-admin',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './user-edit-by-id-admin.component.html'
})
export class UserEditByIdAdminComponent implements OnInit {

  private _userService = inject(UsersService)
  private _activatedRoute = inject(ActivatedRoute)
  private _router = inject(Router)

  changeFullName: string = ''
  changeUsername: string = ''
  changeEmail: string = ''
  changeProfession: string = ''
  changeTechnology: string = ''
  changeDescription: string = ''
  changeConfirmed?: boolean
  changeRegistered?: boolean
  changeBlogNotification?: boolean
  hashedPassword?: string = ''

  ngOnInit() {

    const userId = this._activatedRoute.snapshot.paramMap.get('id') || ''

    this._userService.getUserByIdAdmin(userId).pipe(
      map(data => {
        this.changeFullName = data.full_name
        this.changeUsername = data.username
        this.changeEmail = data.email
        this.changeDescription = data.description
        this.changeProfession = data.profession
        this.changeTechnology = data.technology
        this.hashedPassword = ''
        this.changeConfirmed = data.confirmed
        this.changeRegistered = data.registered
        this.changeBlogNotification = data.blog_notification
      })
    ).subscribe()
  }

  editUser() {

    const updatedUserData: User = {
      full_name: this.changeFullName,
      username: this.changeUsername,
      email: this.changeEmail,
      description: this.changeDescription,
      profession: this.changeProfession,
      technology: this.changeTechnology,
      confirmed: this.changeConfirmed,
      registered: this.changeRegistered,
      blog_notification: this.changeBlogNotification,
      hashed_password: this.hashedPassword,
      datum_vnosa: new Date().toISOString()
    }

    const userId = this._activatedRoute.snapshot.paramMap.get('id') || ''

    this._userService.editUserByIdAdmin(userId, updatedUserData).subscribe()

    this._router.navigate([ 'users-admin' ])
  }
}
