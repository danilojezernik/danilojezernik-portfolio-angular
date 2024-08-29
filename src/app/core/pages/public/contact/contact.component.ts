import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from "@angular/forms";
import { ContactService } from "../../../../services/api/contact.service";
import { ReusableFormAddComponent } from "../../../../shared/forms/reusable-form-add/reusable-form-add.component";
import { Contact } from "../../../../models/contact";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {HeroTitleComponent} from "../../../../shared/components/hero-title/hero-title.component";
import {formContactConfig} from "../../../../shared/global-const/form-config";
import {MatSnackBar} from "@angular/material/snack-bar";
import {of} from "rxjs";
import {LoadingComponent} from "../../../../shared/components/loading/loading.component";

/**
 * ContactComponent is an Angular component designed to handle user contact form submissions.
 * It utilizes the ReusableFormAddComponent to dynamically generate form fields based on a configuration
 * provided within the component. This component is standalone, meaning it can function independently
 * without being part of a larger Angular module. Key functionalities and components included are:
 *
 * 1. **Form Configuration (formConfig)**:
 *    - An array of `FormFieldConfig` objects, each specifying the properties of a form field.
 *    - The configuration includes the field's name, label, input type (text, email, etc.), and validators
 *      (such as required and email format validation).
 *
 * 2. **Form Handling**:
 *    - The `ReusableFormAddComponent` is imported and used to create a form dynamically based on the `formConfig` array.
 *
 * 3. **Form Submission Method (sendEmail)**:
 *    - Method `sendEmail` is defined to handle form submission. It takes the validated form data as an argument
 *      and sends it to the `ContactService` for further processing.
 *    - The method subscribes to the observable returned by the service to handle the response (such as success or error handling).
 */

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ReusableFormAddComponent, TranslateModule, HeroTitleComponent, LoadingComponent],
  templateUrl: './contact.component.html'
})
export class ContactComponent {

  private _contactService = inject(ContactService)
  private _snackBar = inject(MatSnackBar)
  private _translateService = inject(TranslateService); // Injecting TranslateService for translating error messages

  // Property to store error messages, initialized to null
  error: string | null = null;

  // Property to track loading state, initialized to false
  loading: boolean = false;

  /**
   * @method sendEmail
   * Method to send the form data to the contact service.
   * It receives the validated form data as an argument and calls the sendEmailContact method of ContactService.
   *
   * @param formValidator - The form data to be validated and sent to the server for email contact.
   */
  sendEmail(formValidator: Contact) {
    // Show spinner while loading
    this.loading = true;

    /**
     * Sends the validated form data to the contact service's sendEmailContact method.
     * Subscribes to the observable returned by the service method to handle the response.
     */
    this._contactService.sendEmailContact(formValidator).subscribe(() => {
      // Hide spinner after loading
      this.loading = false;

      this._snackBar.open('Uspešno poslano sporočilo', 'Close', {
        duration: 3000
      })
    }, (error) => {
      // Hide spinner after loading
      this.loading = false;

      // Extract the error message
      const message = error.message;
      // Translate the error message using the Translation service and set it to the error property
      this._translateService.get(message).subscribe((translation) => {
        this.error = translation;
      });

      // Return an observable of an empty array to handle errors gracefully
      return of([] as Contact[]);
    })
  }

  protected readonly formContactConfig = formContactConfig;
}
