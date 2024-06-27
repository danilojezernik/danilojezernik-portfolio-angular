import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from "../../../../../services/api/users.service";
import { ActivatedRoute, Router } from "@angular/router";
import { map } from "rxjs";
import { User } from "../../../../../models/user";
import { FormsModule } from "@angular/forms";
import { GoBackComponent } from "../../../../../shared/components/go-back/go-back.component";
import { ReusableFormEditComponent } from "../../../../../shared/forms/reusable-form-edit/reusable-form-edit.component";
import { formUserConfig } from "../../../../../shared/global-const/form-config";

/**
 * @Component UserEditByIdAdminComponent
 * Component for editing user details in the admin interface.
 */

@Component({
  selector: 'app-user-edit-by-id-admin',
  standalone: true,
  imports: [ CommonModule, FormsModule, GoBackComponent, ReusableFormEditComponent ],
  templateUrl: './user-edit-by-id-admin.component.html'
})
export class UserEditByIdAdminComponent implements OnInit {

  // Injected instances: UsersService for user data, ActivatedRoute for route parameters, Router for navigation
  private _userService = inject(UsersService); // Injected UsersService instance
  private _activatedRoute = inject(ActivatedRoute); // Provides access to route parameters
  private _router = inject(Router); // Helps navigate between routes

  formData: any = {}; // Object to hold the blog data to be edited

  /**
   * @method ngOnInit
   * Lifecycle hook that runs when the component initializes.
   * Fetches user details by ID from the UsersService.
   */
  ngOnInit() {
    // Retrieve user ID from the route parameters
    const userId = this._activatedRoute.snapshot.paramMap.get('id') || '';

    // Fetch user details by ID from the UsersService and populate form fields
    this._userService.getUserByIdAdmin(userId).pipe(
      map(data => {
          this.formData = {
            ...data,
            hashed_password: '',
          };

          console.log(this.formData)
        }
      )
    ).subscribe();

  }

  /**
   * @method editUser
   * Updates user details based on the form inputs.
   * Calls UsersService to save the updated user data and navigates back to the users admin page.
   */
  editUser(formValue: User) {
    // Prepare updated user data based on form inputs

    console.log(formValue)
    // Retrieve user ID from the route parameters
    const userId = this._activatedRoute.snapshot.paramMap.get('id') || '';

    // Call UsersService to update user details based on the user ID
    this._userService.editUserByIdAdmin(userId, formValue).subscribe();

    // Navigate the user back to the users admin page after editing is complete
    this._router.navigate([ 'users-admin' ]);
  }

  protected readonly formUserConfig = formUserConfig;
}
