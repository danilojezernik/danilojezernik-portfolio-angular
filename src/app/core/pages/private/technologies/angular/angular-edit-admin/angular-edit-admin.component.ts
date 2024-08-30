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
import {AngularService} from "../../../../../../services/api/angular.service";
import {Angular} from "../../../../../../models/angular.model";

@Component({
  selector: 'app-angular-edit-admin',
  standalone: true,
  imports: [CommonModule, BreadcrumbAdminComponent, GoBackComponent, LoadingComponent, ReusableFormEditComponent],
  templateUrl: './angular-edit-admin.component.html'
})
export class AngularEditAdminComponent implements OnInit {

  // Injected instances: BlogService for managing blog data, ActivatedRoute for accessing route parameters, Router for navigation, TranslateService for translations
  private _angularService = inject(AngularService); // Injecting BlogService for blog-related operations
  private _activatedRoute = inject(ActivatedRoute); // Injecting ActivatedRoute for accessing route parameters
  private _router = inject(Router); // Injecting Router for navigating between routes
  private _translateService = inject(TranslateService); // Injecting TranslateService for translating error messages

  // Property to store error messages, initialized to null
  error: string | null = null;

  // Property to track loading state, initialized to false
  loading: boolean = false;

  // Object to hold the blog data to be edited, initialized to an empty object
  formData: any = {};

  /**
   * @method ngOnInit
   * Lifecycle hook that is called after Angular has initialized all data-bound properties.
   * Retrieves the blog ID from the route parameters and fetches corresponding blog data.
   */
  ngOnInit() {
    // Retrieve the blog ID from the route parameters
    const angularId = this._activatedRoute.snapshot.paramMap.get('id') || '';

    // Show spinner while loading
    this.loading = true;

    // Fetch the blog data using the BlogService based on the retrieved ID
    this._angularService.getAngularById(angularId).pipe(
      map(data => {
        this.formData = data; // Populate formData with fetched blog data
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
        return of([] as Angular[]);
      })
    ).subscribe();
  }

  /**
   * @method editBlog
   * Updates an existing blog post with new data and navigates to the admin blog page upon success.
   *
   * @param formValue - The form data submitted by the user.
   */
  editAngular(formValue: Angular) {

    // Show spinner while loading
    this.loading = true;

    // Retrieve the current blog ID from the route parameters
    const angularId = this._activatedRoute.snapshot.paramMap.get('id') || '';

    // Call the BlogService method to update the blog post with new data
    this._angularService.editAngularById(angularId, formValue).subscribe(() => {

      // Hide spinner after loading
      this.loading = false;

      // Navigate the user back to the blog admin page after editing is complete
      this._router.navigate([ '/tech-all-angular' ]);
    }, (error) => {
      console.log('Error editing angular: ', error)
      // Hide spinner after loading
      this.loading = false;
    });
  }

  /**
   * Form configuration for blog
   * Uses predefined formBlogConfig from a global constant file
   */
  protected readonly formTechnologiesConfig = formTechnologiesConfig;
}
