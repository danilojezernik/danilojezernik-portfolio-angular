import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperiencesService } from "../../../../../services/api/experiences.service";
import { Router } from "@angular/router";
import { Experiences } from "../../../../../models/experiences";
import { formExperiencesConfig } from "../../../../../shared/global-const/form-config";
import { ReusableFormAddComponent } from "../../../../../shared/forms/reusable-form-add/reusable-form-add.component";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { of } from "rxjs";
import { GoBackComponent } from "../../../../../shared/components/go-back/go-back.component";
import { LoadingComponent } from "../../../../../shared/components/loading/loading.component";

@Component({
  selector: 'app-add-experiences-admin',
  standalone: true,
  imports: [ CommonModule, ReusableFormAddComponent, TranslateModule, GoBackComponent, LoadingComponent ],
  templateUrl: './add-experiences-admin.component.html'
})
export class AddExperiencesAdminComponent {

  // Injected instances: ExperiencesService for managing experience data, Router for navigation, TranslateService for translations
  private _experiencesService = inject(ExperiencesService); // Injecting ExperiencesService for experience-related operations
  private _router = inject(Router); // Injecting Router for navigating between routes
  private _translateService = inject(TranslateService); // Injecting TranslateService for translating error messages

  // Property to store error messages, initialized to null
  error: string | null = null;

  // Property to track loading state, initialized to false
  loading: boolean = false;

  /**
   * @method addNewExperience
   * Method to add a new experience based on form inputs.
   * Calls ExperiencesService to add the new experience and navigates to the admin experiences page upon success.
   *
   * @param formValidator - The form data to be validated and sent to the server for adding a new experience.
   */
  addNewExperience(formValidator: Experiences) {
    // Show spinner while loading
    this.loading = true;

    // Call ExperiencesService to add the new experience
    this._experiencesService.addExperience(formValidator).subscribe(() => {
      // Navigate to the experiences admin page after successful addition
      this._router.navigate([ 'experiences-admin' ]);
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
      return of([] as Experiences[]);
    });
  }

  /**
   * Form configuration for experiences
   * Uses predefined formExperiencesConfig from a global constant file
   */
  protected readonly formExperiencesConfig = formExperiencesConfig;
}
