import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechnologyService } from "../../../../../services/api/technology.service";
import { ActivatedRoute, Router } from "@angular/router";
import { catchError, map, of } from "rxjs";
import { Technology } from "../../../../../models/technology";
import { GoBackComponent } from "../../../../../shared/components/go-back/go-back.component";
import { ReusableFormEditComponent } from "../../../../../shared/forms/reusable-form-edit/reusable-form-edit.component";
import { formTechnologyConfig } from "../../../../../shared/global-const/form-config";
import { TranslateService } from "@ngx-translate/core";
import { LoadingComponent } from "../../../../../shared/components/loading/loading.component";

/**
 * @Component EditTechnologyComponent
 * Represents the component responsible for editing a technology post by ID in the admin interface.
 */

@Component({
  selector: 'app-edit-technology-technology',
  standalone: true,
  imports: [ CommonModule, GoBackComponent, ReusableFormEditComponent, LoadingComponent ],
  templateUrl: './edit-technology.component.html'
})
export class EditTechnologyComponent implements OnInit {

  private _technologyService = inject(TechnologyService); // Injecting TechnologyService for technology-related operations
  private _activatedRoute = inject(ActivatedRoute); // Provides access to route parameters
  private _router = inject(Router); // Helps navigate between routes
  private _translateService = inject(TranslateService); // Injecting TranslateService for translating error messages

  // Property to store error messages, initialized to null
  error: string | null = null;

  // Property to track loading state, initialized to false
  loading: boolean = false;

  // Object to hold the technology data to be edited
  formData: any = {};

  /**
   * @method ngOnInit
   * Lifecycle hook that is called after Angular has initialized all data-bound properties.
   * Retrieves the technology ID from the route parameters and fetches corresponding technology data.
   */
  ngOnInit() {
    // Retrieve the technology ID from the route parameters
    const technologyId = this._activatedRoute.snapshot.paramMap.get('id') || '';

    // Show spinner while loading
    this.loading = true;

    // Fetch the technology data using the TechnologyService based on the retrieved ID
    this._technologyService.getTechnologyById(technologyId).pipe(
      map(data => {
        this.formData = data; // Populate formData with fetched technology data
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
        return of([] as Technology[]);
      })
    ).subscribe();
  }

  /**
   * @method editTechnology
   * Updates an existing technology post with new data and navigates to the admin technology page upon success.
   *
   * @param formValue - The form data submitted by the user.
   */
  editTechnology(formValue: Technology) {
    // Show spinner while loading
    this.loading = true;

    const technologyId = this._activatedRoute.snapshot.paramMap.get('id') || '';

    // Call the TechnologyService method to update the technology post with new data
    this._technologyService.editTechnologyById(technologyId, formValue).subscribe(() => {
      // Hide spinner after loading
      this.loading = false;

      // Navigate the user back to the technology admin page after editing is complete
      this._router.navigate([ '/technology-admin' ]);
    }, (error) => {
      console.log('Error editing technology: ', error);
      // Hide spinner after loading
      this.loading = false;
    });
  }

  /**
   * Form configuration for technology
   * Uses predefined formTechnologyConfig from a global constant file
   */
  protected readonly formTechnologyConfig = formTechnologyConfig;
}
