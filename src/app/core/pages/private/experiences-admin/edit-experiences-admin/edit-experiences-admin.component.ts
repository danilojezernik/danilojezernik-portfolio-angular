import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperiencesService } from "../../../../../services/api/experiences.service";
import { ActivatedRoute, Router } from "@angular/router";
import { catchError, map, of } from "rxjs";
import { GoBackComponent } from "../../../../../shared/components/go-back/go-back.component";
import { ReusableFormEditComponent } from "../../../../../shared/forms/reusable-form-edit/reusable-form-edit.component";
import { formExperiencesConfig } from "../../../../../shared/global-const/form-config";
import { TranslateService } from "@ngx-translate/core";
import { Experiences } from "../../../../../models/experiences";
import { LoadingComponent } from "../../../../../shared/components/loading/loading.component";

/**
 * @Component EditExperiencesAdminComponent
 * Component for editing existing experiences in the admin interface.
 */

@Component({
  selector: 'app-edit-experiences-admin',
  standalone: true,
  imports: [ CommonModule, GoBackComponent, ReusableFormEditComponent, LoadingComponent ],
  templateUrl: './edit-experiences-admin.component.html'
})
export class EditExperiencesAdminComponent implements OnInit {

  // Injected instances: ExperiencesService for managing experience data, ActivatedRoute for accessing route parameters, Router for navigation, TranslateService for translations
  private _experiencesService = inject(ExperiencesService); // Service for experience-related operations
  private _activatedRoute = inject(ActivatedRoute); // Provides access to route parameters
  private _router = inject(Router); // Helps navigate between routes
  private _translateService = inject(TranslateService); // Injecting TranslateService for translating error messages

  // Property to store error messages, initialized to null
  error: string | null = null;

  // Property to track loading state, initialized to false
  loading: boolean = false;

  // Object to hold the experience data to be edited
  formData: any = {};

  /**
   * @method ngOnInit
   * Lifecycle hook that is called after Angular has initialized all data-bound properties.
   * Retrieves the experience ID from the route parameters and fetches corresponding experience data.
   */
  ngOnInit() {
    const experiencesId = this._activatedRoute.snapshot.paramMap.get('id') || '';

    // Show spinner while loading
    this.loading = true;

    // Fetch the experience data using the ExperiencesService based on the retrieved ID
    this._experiencesService.getExperienceById(experiencesId).pipe(
      map(data => {
        this.formData = data; // Populate formData with fetched experience data
        this.loading = false; // Hide spinner after loading
      }),
      catchError((error) => {
        this.loading = false; // Hide spinner after loading
        // Extract the error message
        const message = error.message;
        // Translate the error message using the Translation service and set it to the error property
        this._translateService.get(message).subscribe((translation) => {
          this.error = translation;
        });
        // Return an observable of an empty array to handle errors gracefully
        return of([] as Experiences[]);
      })
    ).subscribe();
  }

  /**
   * @method editExperiences
   * Method to edit an existing experience based on form inputs.
   * Calls ExperiencesService to update the experience data and navigates to the admin experiences page upon success.
   *
   * @param formValue - The form data to be validated and sent to the server for updating the experience.
   */
  editExperiences(formValue: any) {
    // Show spinner while loading
    this.loading = true;

    const experiencesId = this._activatedRoute.snapshot.paramMap.get('id') || '';

    // Call ExperiencesService to update the experience data
    this._experiencesService.editExperienceById(experiencesId, formValue).subscribe(() => {
      // Hide spinner after loading
      this.loading = false;

      // Navigate to the experiences admin page after successful update
      this._router.navigate([ 'experiences-admin' ]);
    }, (error) => {
      console.log('Error editing experience: ', error);
      // Hide spinner after loading
      this.loading = false;
    });
  }

  /**
   * Form configuration for experiences
   * Uses predefined formExperiencesConfig from a global constant file
   */
  protected readonly formExperiencesConfig = formExperiencesConfig;
}
