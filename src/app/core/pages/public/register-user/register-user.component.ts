import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RegisterService} from "../../../../services/api/register.service";
import {User} from "../../../../models/user";
import {FormsModule} from "@angular/forms";
import {ReusableFormAddComponent} from "../../../../shared/forms/reusable-form-add/reusable-form-add.component";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {HeroTitleComponent} from "../../../../shared/components/hero-title/hero-title.component";
import {formUserPublicConfig} from "../../../../shared/global-const/form-config";
import {LoadingComponent} from "../../../../shared/components/loading/loading.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SNACKBAR_MESSAGES} from "../../../../shared/global-const/global.const";

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [CommonModule, FormsModule, ReusableFormAddComponent, TranslateModule, HeroTitleComponent, LoadingComponent],
  templateUrl: './register-user.component.html'
})
export class RegisterUserComponent {

  private _registerUserService = inject(RegisterService)
  private _translateService = inject(TranslateService); // Injecting TranslateService for translating error messages
  private _snack = inject(MatSnackBar)
  // Property to store error messages, initialized to null
  error: string | null = null;

  // Property to track loading state, initialized to false
  loading: boolean = false;

  registerNewUser(formValidator: User) {

    // Show spinner while loading
    this.loading = true;

    this._registerUserService.registerNewUser(formValidator).subscribe(() => {
      // Hide spinner after loading
      this.loading = false;
      this._translateService.get([SNACKBAR_MESSAGES.registered, SNACKBAR_MESSAGES.close]).subscribe((translation) => {
        this._snack.open(translation[SNACKBAR_MESSAGES.registered], translation[SNACKBAR_MESSAGES.close], {
          duration: 3000
        })
      })
    }, error => {
      // Hide spinner after loading
      this.loading = false;

      // Extract the error message
      const message = error.message;
      // Translate the error message using the Translation service and set it to the error property
      this._translateService.get(message).subscribe((translation) => {
        this.error = translation;
      });

      setTimeout(() => {
        window.location.reload();
      }, 3000)
    })

  }

  protected readonly formUserPublicConfig = formUserPublicConfig;
}
