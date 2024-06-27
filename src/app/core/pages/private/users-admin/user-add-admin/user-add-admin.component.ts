import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from "../../../../../services/api/users.service";
import { Router } from "@angular/router";
import { User } from "../../../../../models/user";
import { FormsModule } from "@angular/forms";
import { ReusableFormAddComponent } from "../../../../../shared/forms/reusable-form-add/reusable-form-add.component";
import { formUserConfig } from "../../../../../shared/global-const/form-config";

/**
 * @Component UserAddAdminComponent
 * This component handles adding new users in the admin interface.
 * It uses the ReusableFormAddComponent to render the form and handle form submissions.
 */
@Component({
  selector: 'app-user-add-admin',
  standalone: true,
  imports: [ CommonModule, FormsModule, ReusableFormAddComponent ],
  templateUrl: './user-add-admin.component.html'
})
export class UserAddAdminComponent {

  // Injecting UsersService to manage user data and Router for navigation
  private _usersService = inject(UsersService); // Service for managing user-related API calls
  private _router = inject(Router); // Router service for navigation

  /**
   * @method addUser
   * This method is called when the form is submitted.
   * It receives the form data, logs it, and calls the UsersService to add the new user.
   * After successfully adding the user, it navigates back to the users admin page.
   *
   * @param formValue - The form data to be validated and sent to the server for adding a new user.
   */
  addUser(formValue: User) {
    // Log the form value for debugging purposes
    console.log(formValue);

    // Call UsersService to add the new user
    this._usersService.addUserAdmin(formValue).subscribe(
      () => {
        // Navigate to the users admin page after successful addition
        this._router.navigate([ 'users-admin' ]);
      }
    );
  }

  // Form configuration for adding a new user, imported from a global configuration file
  protected readonly formUserConfig = formUserConfig;
}
