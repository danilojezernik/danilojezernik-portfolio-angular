import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterService } from "../../../../services/api/register.service";
import { User } from "../../../../models/user";

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [ CommonModule ],
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

  registerNewUser() {

    const newUser: User = {
      username: this.getUsername,
      email: this.getEmail,
      full_name: this.getFullName,
      profession: this.getProfession,
      hashed_password: this.chosePassword,
      technology: this.getTechnology,
      description: this.getDescription,
      confirmed: false,
      disabled: true,
      blog_notification: false,
      datum_vnosa: new Date().toISOString()
    }

    this._registerUser.registerNewUser(newUser).subscribe()

  }

}
