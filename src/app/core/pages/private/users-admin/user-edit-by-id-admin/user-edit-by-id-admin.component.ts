import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from "../../../../../services/api/users.service";
import { ActivatedRoute, Router } from "@angular/router";
import { catchError, map, of } from "rxjs";
import { User } from "../../../../../models/user";
import { FormsModule } from "@angular/forms";
import { GoBackComponent } from "../../../../../shared/components/go-back/go-back.component";
import { ReusableFormEditComponent } from "../../../../../shared/forms/reusable-form-edit/reusable-form-edit.component";
import { formUserConfig } from "../../../../../shared/global-const/form-config";
import { TranslateService } from "@ngx-translate/core";
import { LoadingComponent } from "../../../../../shared/components/loading/loading.component";

/**
 * @Component UserEditByIdAdminComponent
 * Component for editing user details in the admin interface.
 */

@Component({
  selector: 'app-user-edit-by-id-admin',
  standalone: true,
  imports: [ CommonModule, FormsModule, GoBackComponent, ReusableFormEditComponent, LoadingComponent ],
  templateUrl: './user-edit-by-id-admin.component.html'
})
export class UserEditByIdAdminComponent implements OnInit {

  // Injected instances: UsersService for user data, ActivatedRoute for route parameters, Router for navigation
  private _userService = inject(UsersService); // Injected UsersService instance
  private _activatedRoute = inject(ActivatedRoute); // Provides access to route parameters
  private _router = inject(Router); // Helps navigate between routes
  private _translateService = inject(TranslateService); // Injecting TranslateService for translating error messages

  // Property to store error messages, initialized to null
  error: string | null = null;

  // Property to track loading state, initialized to false
  loading: boolean = false;

  // Object to hold the user data to be edited
  formData: any = {};

  /**
   * @method ngOnInit
   * Lifecycle hook that runs when the component initializes.
   * Fetches user details by ID from the UsersService.
   */
  ngOnInit() {
    // Retrieve user ID from the route parameters
    const userId = this._activatedRoute.snapshot.paramMap.get('id') || '';

    // Show spinner while loading
    this.loading = true;

    // Fetch user details by ID from the UsersService and populate form fields
    this._userService.getUserByIdAdmin(userId).pipe(
      map(data => {
        this.formData = {
          ...data,
          hashed_password: '',
        }
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
        return of([] as User[]);
      })
    ).subscribe();

  }

  /**
   * @method editUser
   * Updates user details based on the form inputs.
   * Calls UsersService to save the updated user data and navigates back to the users admin page.
   *
   * @param formValue - The form data submitted by the user.
   */
  editUser(formValue: User) {

    // Show spinner while loading
    this.loading = true;

    // Retrieve user ID from the route parameters
    const userId = this._activatedRoute.snapshot.paramMap.get('id') || '';

    // Call UsersService to update user details based on the user ID
    this._userService.editUserByIdAdmin(userId, formValue).subscribe(() => {

      // Hide spinner after loading
      this.loading = false;

      // Navigate the user back to the users admin page after editing is complete
      this._router.navigate([ 'users-admin' ]);
    }, (error) => {
      console.log('Error editing user: ', error)
      // Hide spinner after loading
      this.loading = false;
    });

  }

  /**
   * Form configuration for user
   * Uses predefined formUserConfig from a global constant file
   */
  protected readonly formUserConfig = formUserConfig;
}
