import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from "@angular/router";
import { NewsletterService } from "../../../../../services/api/newsletter.service";
import { formNewsletterConfig } from "../../../../../shared/global-const/form-config";
import { ReusableFormAddComponent } from "../../../../../shared/forms/reusable-form-add/reusable-form-add.component";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { of } from "rxjs";
import { Newsletter } from "../../../../../models/newsletter";
import { GoBackComponent } from "../../../../../shared/components/go-back/go-back.component";
import { LoadingComponent } from "../../../../../shared/components/loading/loading.component";

@Component({
  selector: 'app-add-newsletter-admin',
  standalone: true,
  imports: [ CommonModule, ReusableFormAddComponent, TranslateModule, GoBackComponent, LoadingComponent ],
  templateUrl: './add-newsletter-admin.component.html'
})
export class AddNewsletterAdminComponent {

  // Injected instances: NewsletterService for managing newsletter data, MatSnackBar for displaying notifications, Router for navigation
  private _newsletterService = inject(NewsletterService) // Injecting NewsletterService for managing newsletter data
  private _router = inject(Router) // Injecting Router for navigating between routes
  private _translateService = inject(TranslateService); // Injecting TranslateService for translating error messages

  // Property to store error messages, initialized to null
  error: string | null = null;

  // Property to track loading state, initialized to false
  loading: boolean = false;

  /**
   * @method addNewNewsletter
   * Method to add a new newsletter based on form inputs.
   * Validates required fields and calls NewsletterService to add the new newsletter.
   * Navigates back to the newsletter admin page after successful addition.
   *
   * @param formValidator - The form data to be validated and sent to the server for adding a new newsletter.
   */
  addNewNewsletter(formValidator: any) {
    // Show spinner while loading
    this.loading = true;

    // Call NewsletterService to add the new newsletter
    this._newsletterService.addNewsletter(formValidator).subscribe(() => {
      // Hide spinner after loading
      this.loading = false;

      // Navigate to the newsletter admin page after successful addition
      this._router.navigate([ 'newsletter-admin' ])
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
      return of([] as Newsletter[]);
    })
  }

  /**
   * Form configuration for newsletter
   * Uses predefined formNewsletterConfig from a global constant file
   * */
  protected readonly formNewsletterConfig = formNewsletterConfig;
}
