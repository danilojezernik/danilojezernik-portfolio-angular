import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from "../../../../../services/api/users.service";
import { ActivatedRoute, Router } from "@angular/router";
import { map } from "rxjs";
import { User } from "../../../../../models/user";
import { FormsModule } from "@angular/forms";
import { GoBackComponent } from "../../../../../shared/components/go-back/go-back.component";

/**
 * @Component UserEditByIdAdminComponent
 * Component for editing user details in the admin interface.
 */

@Component({
  selector: 'app-user-edit-by-id-admin',
  standalone: true,
  imports: [ CommonModule, FormsModule, GoBackComponent ],
  templateUrl: './user-edit-by-id-admin.component.html'
})
export class UserEditByIdAdminComponent implements OnInit {

  // Injected instances: UsersService for user data, ActivatedRoute for route parameters, Router for navigation
  private _userService = inject(UsersService); // Injected UsersService instance
  private _activatedRoute = inject(ActivatedRoute); // Provides access to route parameters
  private _router = inject(Router); // Helps navigate between routes

  // Properties to bind to form inputs
  changeFullName: string = ''; // Full name of the user
  changeUsername: string = ''; // Username of the user
  changeEmail: string = ''; // Email address of the user
  changeProfession: string = ''; // Profession of the user
  changeTechnology: string = ''; // Technology of interest to the user
  changeDescription: string = ''; // Description or bio of the user
  changeConfirmed?: boolean; // Flag indicating if user account is confirmed
  changeRegistered?: boolean; // Flag indicating if user is registered
  changeBlogNotification?: boolean; // Flag indicating if user has blog notifications enabled
  hashedPassword?: string = ''; // Hashed password of the user (if applicable)

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
        this.changeFullName = data.full_name;
        this.changeUsername = data.username;
        this.changeEmail = data.email;
        this.changeDescription = data.description;
        this.changeProfession = data.profession;
        this.changeTechnology = data.technology;
        this.hashedPassword = '';
        this.changeConfirmed = data.confirmed;
        this.changeRegistered = data.registered;
        this.changeBlogNotification = data.blog_notification;
      })
    ).subscribe();
  }

  /**
   * @method editUser
   * Updates user details based on the form inputs.
   * Calls UsersService to save the updated user data and navigates back to the users admin page.
   */
  editUser() {
    // Prepare updated user data based on form inputs
    const updatedUserData: User = {
      full_name: this.changeFullName,
      username: this.changeUsername,
      email: this.changeEmail,
      description: this.changeDescription,
      profession: this.changeProfession,
      technology: this.changeTechnology,
      confirmed: this.changeConfirmed,
      registered: this.changeRegistered,
      blog_notification: this.changeBlogNotification,
      hashed_password: this.hashedPassword,
      datum_vnosa: new Date().toISOString() // Timestamp of when the user data was last updated
    };

    // Retrieve user ID from the route parameters
    const userId = this._activatedRoute.snapshot.paramMap.get('id') || '';

    // Call UsersService to update user details based on the user ID
    this._userService.editUserByIdAdmin(userId, updatedUserData).subscribe();

    // Navigate the user back to the users admin page after editing is complete
    this._router.navigate([ 'users-admin' ]);
  }

}
