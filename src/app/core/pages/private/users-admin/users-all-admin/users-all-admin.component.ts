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
import { ShowDataTestComponent } from "../../../../../shared/components/show-data-test/show-data-test.component";

@Component({
  selector: 'app-users-admin',
  standalone: true,
  imports: [ CommonModule, GoBackComponent, RouterLink, MatDialogModule, ShowDataTestComponent ],
  templateUrl: './users-all-admin.component.html'
})
export class UsersAllAdminComponent {

  private _dialog = inject(MatDialog); // Injecting MatDialog for opening dialogs

  private _userService = inject(UsersService); // Injecting UsersService for fetching user data

  users$ = this._userService.getAllUsersPrivate(); // Observable that fetches all private users
  userById$!: Observable<User>; // Observable that holds a specific user's data

  /**
   * Method to fetch a specific user's data by ID.
   * @param id - The ID of the user to fetch
   */
  getUserById(id: string) {
    this.userById$ = this._userService.getUserByIdAdmin(id);
  }

  /**
   * Method to open a dialog showing user details based on ID.
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
