import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterService } from "../../../../services/api/register.service";
import { User } from "../../../../models/user";
import { FormsModule } from "@angular/forms";
import {ReusableFormAddComponent} from "../../../../shared/forms/reusable-form-add/reusable-form-add.component";
import {TranslateModule} from "@ngx-translate/core";
import {HeroTitleComponent} from "../../../../shared/components/hero-title/hero-title.component";

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [CommonModule, FormsModule, ReusableFormAddComponent, TranslateModule, HeroTitleComponent],
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
  getConfirmed: boolean = false
  getBlogNotification: boolean = false
  error = ''

  registerNewUser() {
    if(!this.getUsername || !this.getEmail || !this.chosePassword || !this.getFullName) {
      this.error = 'errors.emptyregister'
      return
    }

    console.log('Get blog notification', this.getBlogNotification)
    console.log('Get newsletter', this.getConfirmed)

    const newUser: User = {
      username: this.getUsername,
      email: this.getEmail,
      full_name: this.getFullName,
      profession: this.getProfession,
      hashed_password: this.chosePassword,
      technology: this.getTechnology,
      description: this.getDescription,
      confirmed: this.getConfirmed,
      registered: false,
      blog_notification: this.getBlogNotification,
      datum_vnosa: new Date().toISOString()
    }

    console.log(newUser.confirmed)
    console.log(newUser.blog_notification)

    this._registerUser.registerNewUser(newUser).subscribe(() => {
      this.getUsername = ''
      this.chosePassword = ''
      this.getFullName = ''
      this.getEmail = ''
      this.getConfirmed = false
      this.getBlogNotification = false
    }, error => {
      // Handle HTTP error
      console.error('Login request failed', error);
      this.error = 'errors.pass'
    })

  }

}
