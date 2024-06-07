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
  chosePassword: string = ''

  registerNewUser() {

    const newUser: User = {
      username: this.getUsername,
      email: this.getEmail,
      full_name: this.getFullName,
      hashed_password: this.chosePassword,
      confirmed: false,
      disabled: true,
      datum_vnosa: new Date().toISOString()
    }

    this._registerUser.registerNewUser(newUser).subscribe()

  }

}
