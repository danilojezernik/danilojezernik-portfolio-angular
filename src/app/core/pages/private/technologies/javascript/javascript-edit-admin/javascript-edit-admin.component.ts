import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BreadcrumbAdminComponent
} from "../../../../../../shared/components/breadcrumb-admin/breadcrumb-admin.component";
import {GoBackComponent} from "../../../../../../shared/components/go-back/go-back.component";
import {LoadingComponent} from "../../../../../../shared/components/loading/loading.component";
import {
  ReusableFormEditComponent
} from "../../../../../../shared/forms/reusable-form-edit/reusable-form-edit.component";
import {ActivatedRoute, Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {catchError, map, of} from "rxjs";
import {JavascriptService} from "../../../../../../services/api/javascript.service";
import {JavaScript} from "../../../../../../models/javascript.model";
import {formTechnologiesConfig} from "../../../../../../shared/global-const/form-config";

@Component({
  selector: 'app-javascript-edit-admin',
  standalone: true,
  imports: [CommonModule, BreadcrumbAdminComponent, GoBackComponent, LoadingComponent, ReusableFormEditComponent],
  templateUrl: './javascript-edit-admin.component.html'
})
export class JavascriptEditAdminComponent implements OnInit {

  // Injected services for managing JavaScript data, accessing route parameters, navigation, and translations
  private _javascriptService = inject(JavascriptService); // Service for managing JavaScript data
  private _activatedRoute = inject(ActivatedRoute); // Service for accessing route parameters
  private _router = inject(Router); // Service for navigation
  private _translateService = inject(TranslateService); // Service for translating error messages

  // Property to store error messages; initialized to null
  error: string | null = null;

  // Property to track loading state; initialized to false
  loading: boolean = false;

  // Object to hold the JavaScript data to be edited; initialized to an empty object
  formData: any = {};

  /**
   * @method ngOnInit
   * Lifecycle hook that is called after Angular has initialized all data-bound properties.
   * Retrieves the JavaScript ID from the route parameters and fetches the corresponding data.
   */
  ngOnInit() {
    // Retrieve the JavaScript ID from the route parameters
    const javascriptId = this._activatedRoute.snapshot.paramMap.get('id') || '';

    // Set loading to true to show spinner
    this.loading = true;

    // Fetch the JavaScript data using the JavascriptService based on the retrieved ID
    this._javascriptService.getJavascriptById(javascriptId).pipe(
      map(data => {
        this.formData = data; // Populate formData with the fetched data
        this.loading = false; // Hide spinner after loading
      }),
      catchError((error) => {
        this.loading = false; // Hide spinner after loading
        // Extract the error message
        const message = error.message;
        // Translate the error message and assign it to the error property
        this._translateService.get(message).subscribe((translation) => {
          this.error = translation;
        });
        // Return an observable of an empty array to handle errors gracefully
        return of([] as JavaScript[]);
      })
    ).subscribe();
  }

  /**
   * @method editJavaScript
   * Updates an existing JavaScript entry with new data and navigates to the admin page upon success.
   *
   * @param formValue - The form data submitted by the user.
   */
  editJavaScript(formValue: JavaScript) {
    // Set loading to true to show spinner
    this.loading = true;

    // Retrieve the current JavaScript ID from the route parameters
    const javascriptId = this._activatedRoute.snapshot.paramMap.get('id') || '';

    // Use JavascriptService to update the JavaScript entry with new data
    this._javascriptService.editJavascriptById(javascriptId, formValue).subscribe(() => {
      // Set loading to false after update
      this.loading = false;

      // Navigate the user back to the JavaScript admin page after editing is complete
      this._router.navigate(['/tech-all-javascript']);
    }, (error) => {
      console.log('Error editing JavaScript: ', error);
      // Set loading to false if an error occurs
      this.loading = false;
    });
  }

  /**
   * Configuration for the JavaScript form
   * This configuration is used by the reusable form component.
   */
  protected readonly formTechnologiesConfig = formTechnologiesConfig;
}
