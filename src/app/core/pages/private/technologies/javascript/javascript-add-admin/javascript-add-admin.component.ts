import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BreadcrumbAdminComponent
} from "../../../../../../shared/components/breadcrumb-admin/breadcrumb-admin.component";
import {GoBackComponent} from "../../../../../../shared/components/go-back/go-back.component";
import {LoadingComponent} from "../../../../../../shared/components/loading/loading.component";
import {ReusableFormAddComponent} from "../../../../../../shared/forms/reusable-form-add/reusable-form-add.component";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";
import {of} from "rxjs";
import {JavascriptService} from "../../../../../../services/api/javascript.service";
import {JavaScript} from "../../../../../../models/javascript.model";
import {formTechnologiesConfig} from "../../../../../../shared/global-const/form-config";

@Component({
  selector: 'app-javascript-add-admin',
  standalone: true,
  imports: [CommonModule, BreadcrumbAdminComponent, GoBackComponent, LoadingComponent, ReusableFormAddComponent, TranslateModule],
  templateUrl: './javascript-add-admin.component.html'
})
export class JavascriptAddAdminComponent {

  // Inject services for use in this component
  private _javascriptService = inject(JavascriptService); // Service for managing JavaScript data
  private _router = inject(Router); // Service for navigation between routes
  private _translateService = inject(TranslateService); // Service for translating messages

  // Property to store error messages; initially set to null
  error: string | null = null;

  // Property to track loading state; initially set to false
  loading: boolean = false;

  /**
   * @method addNewJavaScript
   * Adds a new JavaScript entry based on form inputs.
   * Validates required fields and uses JavascriptService to submit the new entry.
   * After successful addition, navigates back to the admin page for all JavaScript entries.
   *
   * @param formValidator - The validated form data to be sent to the server for adding a new JavaScript entry.
   */
  addNewJavaScript(formValidator: JavaScript) {
    // Set loading to true to show spinner
    this.loading = true;

    // Use JavascriptService to add the new entry
    this._javascriptService.addJavascript(formValidator).subscribe(() => {
      // On success, set loading to false and navigate to the JavaScript admin page
      this.loading = false;
      this._router.navigate(['tech-all-javascript']);
    }, (error) => {
      // On error, set loading to false
      this.loading = false;

      // Extract error message from the response
      const message = error.message;
      // Translate the error message and assign it to the error property
      this._translateService.get(message).subscribe((translation) => {
        this.error = translation;
      });

      // Return an observable of an empty array to handle errors gracefully
      return of([] as JavaScript[]);
    });
  }

  /**
   * Configuration for the JavaScript form
   * This configuration is used by the reusable form component.
   */
  protected readonly formTechnologiesConfig = formTechnologiesConfig;
}
