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
import {AngularService} from "../../../../../../services/api/angular.service";
import {Router} from "@angular/router";
import {of} from "rxjs";
import {Angular} from "../../../../../../models/angular.model";

@Component({
  selector: 'app-angular-add-admin',
  standalone: true,
  imports: [CommonModule, BreadcrumbAdminComponent, GoBackComponent, LoadingComponent, ReusableFormAddComponent, TranslateModule],
  templateUrl: './angular-add-admin.component.html'
})
export class AngularAddAdminComponent {

  // Injected instances: BlogService for managing blog data, MatSnackBar for displaying notifications, Router for navigation
  private _angularService = inject(AngularService)
  private _router = inject(Router); // Injecting Router for navigating between routes
  private _translateService = inject(TranslateService); // Injecting TranslateService for translating error messages

  // Property to store error messages, initialized to null
  error: string | null = null;

  // Property to track loading state, initialized to false
  loading: boolean = false;

  /**
   * @method addNewBlog
   * Method to add a new blog post based on form inputs.
   * Validates required fields and calls BlogService to add the new blog post.
   * Navigates back to the blog admin page after successful addition.
   *
   * @param formValidator - The form data to be validated and sent to the server for adding a new blog post.
   */
  addNewAngular(formValidator: Angular) {
    // Show spinner while loading
    this.loading = true;

    // Call BlogService to add the new blog post
    this._angularService.addAngular(formValidator).subscribe(() => {
      // Hide spinner after loading
      this.loading = false;

      // Navigate to the blog admin page after successful addition
      this._router.navigate([ 'tech-all-angular' ]);
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
      return of([] as Angular[]);
    });
  }

  /**
   * Form configuration for blog
   * Uses predefined formBlogConfig from a global constant file
   */
  protected readonly formTechnologiesConfig = formTechnologiesConfig;
}
