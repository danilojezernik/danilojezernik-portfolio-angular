import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterService } from "../../../../services/api/register.service";
import { User } from "../../../../models/user";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [ CommonModule, FormsModule ],
  templateUrl: './register-user.component.html'
})
export class RegisterUserComponent {

  private _registerUser = inject(RegisterService)

  getUsername: string = ''
  getEmail: string = ''
  getFullName: string = ''
  getProfession: string = ''
  getTechnology: string = ''
  getDescription: string = ''
  chosePassword: string = ''
  getConfirmed!: boolean
  getBlogNotification!: boolean

  registerNewUser() {

    console.log(this.getConfirmed)
    const newUser: User = {
      username: this.getUsername,
      email: this.getEmail,
      full_name: this.getFullName,
      profession: this.getProfession,
      hashed_password: this.chosePassword,
      technology: this.getTechnology,
      description: this.getDescription,
      confirmed: this.getConfirmed,
      disabled: true,
      blog_notification: this.getBlogNotification,
      datum_vnosa: new Date().toISOString()
    }
    console.log(newUser.confirmed)
    this._registerUser.registerNewUser(newUser).subscribe(data => console.log(data.confirmed))

  }

}
