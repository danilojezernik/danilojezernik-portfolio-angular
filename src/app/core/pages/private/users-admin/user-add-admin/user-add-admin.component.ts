import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from "../../../../../services/api/users.service";
import { Router } from "@angular/router";
import { User } from "../../../../../models/user";
import { FormsModule } from "@angular/forms";
import { ReusableFormAddComponent } from "../../../../../shared/forms/reusable-form-add/reusable-form-add.component";
import { formUserConfig } from "../../../../../shared/global-const/form-config";
import { TranslateService } from "@ngx-translate/core";
import { of } from "rxjs";
import { GoBackComponent } from "../../../../../shared/components/go-back/go-back.component";
import { LoadingComponent } from "../../../../../shared/components/loading/loading.component";
import {BreadcrumbAdminComponent} from "../../../../../shared/components/breadcrumb-admin/breadcrumb-admin.component";

/**
 * @Component UserAddAdminComponent
 * This component handles adding new users in the admin interface.
 * It uses the ReusableFormAddComponent to render the form and handle form submissions.
 */

@Component({
  selector: 'app-user-add-admin',
  standalone: true,
    imports: [CommonModule, FormsModule, ReusableFormAddComponent, GoBackComponent, LoadingComponent, BreadcrumbAdminComponent],
  templateUrl: './user-add-admin.component.html'
})
export class UserAddAdminComponent {

  // Injecting UsersService to manage user data and Router for navigation
  private _usersService = inject(UsersService); // Service for managing user-related API calls
  private _router = inject(Router); // Router service for navigation
  private _translateService = inject(TranslateService); // Injecting TranslateService for translating error messages

  // Property to store error messages, initialized to null
  error: string | null = null;

  // Property to track loading state, initialized to false
  loading: boolean = false;

  /**
   * @method addUser
   * This method is called when the form is submitted.
   * It receives the form data, logs it, and calls the UsersService to add the new user.
   * After successfully adding the user, it navigates back to the users admin page.
   *
   * @param formValue - The form data to be validated and sent to the server for adding a new user.
   */
  addUser(formValue: User) {
    // Show spinner while loading
    this.loading = true;

    // Call UsersService to add the new user
    this._usersService.addUserAdmin(formValue).subscribe(
      () => {
        // Hide spinner after loading
        this.loading = false;

        // Navigate to the users admin page after successful addition
        this._router.navigate([ 'users-admin' ]);
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
        return of([] as User[]);
      });
  }

  /**
   * Form configuration for user
   * Uses predefined formUserConfig from a global constant file
   */
  protected readonly formUserConfig = formUserConfig;
}
