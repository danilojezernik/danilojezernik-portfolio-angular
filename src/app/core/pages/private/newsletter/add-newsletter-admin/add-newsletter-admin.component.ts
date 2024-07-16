import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from "@angular/router";
import { NewsletterService } from "../../../../../services/api/newsletter.service";
import { formNewsletterConfig } from "../../../../../shared/global-const/form-config";
import { ReusableFormAddComponent } from "../../../../../shared/forms/reusable-form-add/reusable-form-add.component";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: 'app-add-newsletter-admin',
  standalone: true,
  imports: [ CommonModule, ReusableFormAddComponent, TranslateModule ],
  templateUrl: './add-newsletter-admin.component.html'
})
export class AddNewsletterAdminComponent {

  // Injected instances: NewsletterService for managing newsletter data, MatSnackBar for displaying notifications, Router for navigation
  private _newsletterService = inject(NewsletterService) // Injecting NewsletterService for managing newsletter data
  private _router = inject(Router) // Injecting Router for navigating between routes

  /**
   * @method addNewNewsletter
   * Method to add a new newsletter based on form inputs.
   * Validates required fields and calls NewsletterService to add the new newsletter.
   * Navigates back to the newsletter admin page after successful addition.
   *
   * @param formValidator - The form data to be validated and sent to the server for adding a new newsletter.
   */
  addNewNewsletter(formValidator: any) {
    // Call NewsletterService to add the new newsletter
    this._newsletterService.addNewsletter(formValidator).subscribe(() => {
      // Navigate to the newsletter admin page after successful addition
      this._router.navigate([ 'newsletter-admin' ])
    })
  }

  /**
   * Form configuration for newsletter
   * Uses predefined formNewsletterConfig from a global constant file
   * */
  protected readonly formNewsletterConfig = formNewsletterConfig;
}
