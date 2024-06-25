import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from "../../../../../services/api/users.service";
import { GoBackComponent } from "../../../../../shared/components/go-back/go-back.component";
import { RouterLink } from "@angular/router";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { User } from "../../../../../models/user";
import {
  DialogGlobalAdminComponent
} from "../../../../../shared/components/dialogs/dialog-global-admin/dialog-global-admin.component";
import { DIALOG_DIMENSIONS } from "../../../../../shared/global-const/global.const";
import { ShowDataComponent } from "../../../../../shared/components/show-data/show-data.component";

/**
 * @Component UsersAllAdminComponent
 * Component for managing users in the admin interface.
 * Displays a list of users and allows viewing details of individual users.
 */

@Component({
  selector: 'app-users-admin',
  standalone: true,
  imports: [ CommonModule, GoBackComponent, RouterLink, MatDialogModule, ShowDataComponent ],
  templateUrl: './users-all-admin.component.html'
})
export class UsersAllAdminComponent {

  // Injected instances: MatDialog for opening dialogs, UsersService for fetching user data
  private _dialog = inject(MatDialog); // Injecting MatDialog for opening dialogs
  private _userService = inject(UsersService); // Injecting UsersService for fetching user data

  // Observable to hold list of private users
  users$ = this._userService.getAllUsersPrivate(); // Observable that fetches all private users
  userById$!: Observable<User>; // Observable that holds a specific user's data

  /**
   * @method getUserById
   * Fetches a specific user's data by ID from the UsersService.
   * @param id - The ID of the user to fetch
   */
  getUserById(id: string) {
    this.userById$ = this._userService.getUserByIdAdmin(id);
  }

  /**
   * @method openDialog
   * Opens a dialog showing details of a specific user based on their ID.
   * @param id - Optional ID of the user for whom details are displayed
   */
  openDialog(id?: string) {
    if (id) { // If ID is provided
      this.getUserById(id); // Fetch user data
      this.userById$.subscribe(data => { // Subscribe to user data observable
        this._dialog.open(DialogGlobalAdminComponent, { // Open MatDialog with specified component and data
          data: {
            title: data.username, // Title of the dialog based on user's username
            allData: data // Pass all user data to the dialog
          },
          ...DIALOG_DIMENSIONS.admin // Spread dimensions for dialog configuration
        });
      });
    } else { // If ID is not provided
      console.error('No id'); // Log an error message
    }
  }

}
