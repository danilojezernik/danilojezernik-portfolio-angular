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
import {formTechnologiesConfig} from "../../../../../../shared/global-const/form-config";
import {ActivatedRoute, Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {catchError, map, of} from "rxjs";
import {TypescriptService} from "../../../../../../services/api/typescript.service";
import {TypeScript} from "../../../../../../models/typescript.model";

@Component({
  selector: 'app-typescript-edit-admin',
  standalone: true,
  imports: [CommonModule, BreadcrumbAdminComponent, GoBackComponent, LoadingComponent, ReusableFormEditComponent],
  templateUrl: './typescript-edit-admin.component.html'
})
export class TypescriptEditAdminComponent implements OnInit {

  // Injected services for managing TypeScript data, accessing route parameters, navigating routes, and translating messages
  private _typescriptService = inject(TypescriptService); // Service for managing TypeScript data
  private _activatedRoute = inject(ActivatedRoute); // Service for accessing route parameters
  private _router = inject(Router); // Service for navigating between routes
  private _translateService = inject(TranslateService); // Service for translating error messages

  // Property to store error messages; initially set to null
  error: string | null = null;

  // Property to track loading state; initially set to false
  loading: boolean = false;

  // Object to hold the TypeScript data to be edited; initially set to an empty object
  formData: any = {};

  /**
   * @method ngOnInit
   * Lifecycle hook that is called after Angular has initialized all data-bound properties.
   * Retrieves the TypeScript ID from the route parameters and fetches the corresponding TypeScript data.
   */
  ngOnInit() {
    // Retrieve the TypeScript ID from the route parameters
    const typescriptId = this._activatedRoute.snapshot.paramMap.get('id') || '';

    // Set loading to true to show the spinner
    this.loading = true;

    // Fetch the TypeScript data using the TypescriptService based on the retrieved ID
    this._typescriptService.getTypescriptById(typescriptId).pipe(
      map(data => {
        this.formData = data; // Populate formData with the fetched TypeScript data
        this.loading = false; // Set loading to false after data is loaded
      }),
      catchError((error) => {
        this.loading = false; // Set loading to false in case of an error
        // Extract the error message
        const message = error.message;
        // Translate the error message using the TranslateService and set it to the error property
        this._translateService.get(message).subscribe((translation) => {
          this.error = translation;
        });
        // Return an observable of an empty array to handle errors gracefully
        return of([] as TypeScript[]);
      })
    ).subscribe();
  }

  /**
   * @method editTypeScript
   * Updates an existing TypeScript entry with new data and navigates to the admin TypeScript page upon success.
   *
   * @param formValue - The form data submitted by the user.
   */
  editTypeScript(formValue: TypeScript) {
    // Set loading to true to show the spinner
    this.loading = true;

    // Retrieve the current TypeScript ID from the route parameters
    const typescriptId = this._activatedRoute.snapshot.paramMap.get('id') || '';

    // Use TypescriptService to update the TypeScript entry with new data
    this._typescriptService.editTypescriptById(typescriptId, formValue).subscribe(() => {
      // Set loading to false after update
      this.loading = false;

      // Navigate the user back to the TypeScript admin page after editing is complete
      this._router.navigate(['/tech-all-typescript']);
    }, (error) => {
      console.log('Error editing TypeScript: ', error);
      // Set loading to false in case of an error
      this.loading = false;
    });
  }

  /**
   * Form configuration for TypeScript
   * This configuration is used by the reusable form component.
   */
  protected readonly formTechnologiesConfig = formTechnologiesConfig;

}
