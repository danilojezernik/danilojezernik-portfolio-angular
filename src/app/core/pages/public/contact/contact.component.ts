import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, Validators } from "@angular/forms";
import { ContactService } from "../../../../services/api/contact.service";
import { ReusableFormComponent } from "../../../../shared/forms/reusable-form/reusable-form.component";
import { FormFieldConfig } from "../../../../models/form-field-config.model";

/**
 * ContactComponent is an Angular component designed to handle user contact form submissions.
 * It utilizes the ReusableFormComponent to dynamically generate form fields based on a configuration
 * provided within the component. This component is standalone, meaning it can function independently
 * without being part of a larger Angular module. Key functionalities and components included are:
 *
 * 1. **Form Configuration (formConfig)**:
 *    - An array of `FormFieldConfig` objects, each specifying the properties of a form field.
 *    - The configuration includes the field's name, label, input type (text, email, etc.), and validators
 *      (such as required and email format validation).
 *
 * 2. **Form Handling**:
 *    - The `ReusableFormComponent` is imported and used to create a form dynamically based on the `formConfig` array.
 *
 * 3. **Form Submission Method (sendEmail)**:
 *    - Method `sendEmail` is defined to handle form submission. It takes the validated form data as an argument
 *      and sends it to the `ContactService` for further processing.
 *    - The method subscribes to the observable returned by the service to handle the response (such as success or error handling).
 */

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, ReusableFormComponent ],
  templateUrl: './contact.component.html'
})
export class ContactComponent {

  private _contactService = inject(ContactService)

  /**
   * formConfig defines the configuration for the form fields.
   * It is an array of FormFieldConfig objects, each specifying the name, label, type, and validators for a form field.
   */
  formConfig: FormFieldConfig[] = [
    { name: 'name', label: 'First Name', type: 'text', validators: [ Validators.required ] },
    { name: 'surname', label: 'Last Name', type: 'text', validators: [ Validators.required ] },
    { name: 'email', label: 'Email', type: 'email', validators: [ Validators.required, Validators.email ] },
    { name: 'message', label: 'Message', type: 'text', validators: [ Validators.required, Validators.min(10) ] }
  ];

  /**
   * The sendEmail method is called to send the form data to the contact service.
   * It receives the validated form data as an argument and calls the sendEmailContact method of ContactService.
   */
  sendEmail(formValidator: any) {
    /**
     * Sends the validated form data to the contact service's sendEmailContact method.
     * Subscribes to the observable returned by the service method to handle the response.
     */
    this._contactService.sendEmailContact(formValidator).subscribe()
  }

}
