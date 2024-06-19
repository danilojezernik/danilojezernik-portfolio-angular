import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from "../../../../../services/api/users.service";
import { Router } from "@angular/router";
import { User } from "../../../../../models/user";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-user-add-admin',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './user-add-admin.component.html'
})
export class UserAddAdminComponent {

  private _usersService = inject(UsersService)
  private _router = inject(Router)

  addFullName: string = ''
  addUsername: string = ''
  addEmail: string = ''
  addProfession: string = ''
  addTechnology: string = ''
  addDescription: string = ''
  addPassword: string = ''
  addConfirmed: boolean = false
  addRegistered: boolean = false
  addBlogNotification: boolean = false
  userAddStatus: string = ''


  addUser() {

    if (!this.addFullName)
      return

    const newUser: User = {
      full_name: this.addFullName,
      username: this.addUsername,
      email: this.addEmail,
      profession: this.addProfession,
      technology: this.addTechnology,
      description: this.addDescription,
      hashed_password: this.addPassword,
      confirmed: this.addConfirmed,
      registered: this.addRegistered,
      blog_notification: this.addBlogNotification,
      datum_vnosa: new Date().toISOString()
    }

    this._usersService.addUserAdmin(newUser).subscribe(
      () => {
        this._router.navigate([ 'users-admin' ])
      },
      (error) => {
        this.userAddStatus = error.message;
      }
    )
  }
}
