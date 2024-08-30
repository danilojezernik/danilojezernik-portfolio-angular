import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BreadcrumbAdminComponent
} from "../../../../../../shared/components/breadcrumb-admin/breadcrumb-admin.component";
import {GoBackComponent} from "../../../../../../shared/components/go-back/go-back.component";
import {LoadingComponent} from "../../../../../../shared/components/loading/loading.component";
import {ReusableFormAddComponent} from "../../../../../../shared/forms/reusable-form-add/reusable-form-add.component";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {formTechnologiesConfig} from "../../../../../../shared/global-const/form-config";
import {Router} from "@angular/router";
import {of} from "rxjs";
import {TypescriptService} from "../../../../../../services/api/typescript.service";
import {TypeScript} from "../../../../../../models/typescript.model";

@Component({
  selector: 'app-typescript-add-admin',
  standalone: true,
  imports: [CommonModule, BreadcrumbAdminComponent, GoBackComponent, LoadingComponent, ReusableFormAddComponent, TranslateModule],
  templateUrl: './typescript-add-admin.component.html'
})
export class TypescriptAddAdminComponent {

  // Injected services for managing TypeScript data, navigating routes, and translating messages
  private _typescriptService = inject(TypescriptService); // Service for managing TypeScript data
  private _router = inject(Router); // Service for navigating between routes
  private _translateService = inject(TranslateService); // Service for translating error messages

  // Property to store error messages; initially set to null
  error: string | null = null;

  // Property to track loading state; initially set to false
  loading: boolean = false;

  /**
   * @method addNewTypeScript
   * Adds a new TypeScript entry based on form inputs.
   * Validates required fields and uses TypescriptService to add the new entry.
   * After successful addition, navigates back to the TypeScript admin page.
   *
   * @param formValidator - The form data to be validated and sent to the server for adding a new TypeScript entry.
   */
  addNewTypeScript(formValidator: TypeScript) {
    // Set loading to true to show the spinner
    this.loading = true;

    // Use TypescriptService to add the new entry
    this._typescriptService.addTypescript(formValidator).subscribe(() => {
      // On success, set loading to false and navigate to the TypeScript admin page
      this.loading = false;
      this._router.navigate(['tech-all-typescript']);
    }, (error) => {
      // On error, set loading to false
      this.loading = false;

      // Extract the error message from the response
      const message = error.message;
      // Translate the error message and assign it to the error property
      this._translateService.get(message).subscribe((translation) => {
        this.error = translation;
      });

      // Return an observable of an empty array to handle errors gracefully
      return of([] as TypeScript[]);
    });
  }

  /**
   * Form configuration for TypeScript
   * This configuration is used by the reusable form component.
   */
  protected readonly formTechnologiesConfig = formTechnologiesConfig;
}
