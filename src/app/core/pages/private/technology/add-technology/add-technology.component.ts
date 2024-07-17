import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { formTechnologyConfig } from "../../../../../shared/global-const/form-config";
import { ReusableFormAddComponent } from "../../../../../shared/forms/reusable-form-add/reusable-form-add.component";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { TechnologyService } from "../../../../../services/api/technology.service";
import { Router } from "@angular/router";
import { Technology } from "../../../../../models/technology";
import { of } from "rxjs";
import { GoBackComponent } from "../../../../../shared/components/go-back/go-back.component";
import { LoadingComponent } from "../../../../../shared/components/loading/loading.component";

/**
 * @Component AddTechnologyComponent
 * Component for adding new technology posts in the admin interface.
 */

@Component({
  selector: 'app-add-technology-technology',
  standalone: true,
  imports: [ CommonModule, ReusableFormAddComponent, TranslateModule, GoBackComponent, LoadingComponent ],
  templateUrl: './add-technology.component.html'
})
export class AddTechnologyComponent {

  private _technologyService = inject(TechnologyService); // Injecting TechnologyService to use its methods
  private _router = inject(Router); // Injecting Router for navigation
  private _translateService = inject(TranslateService); // Injecting TranslateService for translating error messages

  // Property to store error messages, initialized to null
  error: string | null = null;

  // Property to track loading state, initialized to false
  loading: boolean = false;

  /**
   * @method addTechnology
   * Method to add a new technology based on form inputs.
   * Validates required fields and calls TechnologyService to add the new technology.
   * Navigates back to the technology admin page after successful addition.
   *
   * @param formValidator - The form data to be validated and sent to the server for adding a new technology.
   */
  addTechnology(formValidator: Technology) {
    // Show spinner while loading
    this.loading = true;

    // Call TechnologyService to add the new technology
    this._technologyService.addTechnology(formValidator).subscribe(() => {
      // Hide spinner after loading
      this.loading = false;

      // Navigate to the technology admin page after successful addition
      this._router.navigate([ 'technology-admin' ]);
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
      return of([] as Technology[]);
    });
  }

  /**
   * Form configuration for technology
   * Uses predefined formTechnologyConfig from a global constant file
   */
  protected readonly formTechnologyConfig = formTechnologyConfig;
}
