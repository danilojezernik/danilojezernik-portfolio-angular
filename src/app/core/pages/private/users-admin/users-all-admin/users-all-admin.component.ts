import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from "../../../../../services/api/users.service";
import { GoBackComponent } from "../../../../../shared/components/go-back/go-back.component";
import { RouterLink } from "@angular/router";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { BehaviorSubject, catchError, finalize, Observable, of } from "rxjs";
import { User } from "../../../../../models/user";
import { ShowDataComponent } from "../../../../../shared/components/show-data/show-data.component";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { ButtonAdminComponent } from "../../../../../shared/components/button-admin/button-admin.component";
import { openDialogUtil } from "../../../../../utils/open-dialog.util";
import { LoadingComponent } from "../../../../../shared/components/loading/loading.component";
import {BreadcrumbAdminComponent} from "../../../../../shared/components/breadcrumb-admin/breadcrumb-admin.component";
import {CdkDropList} from "@angular/cdk/drag-drop";

/**
 * @Component UsersAllAdminComponent
 * Component for managing users in the admin interface.
 * Displays a list of users and allows viewing details of individual users.
 */

@Component({
  selector: 'app-users-admin',
  standalone: true,
    imports: [CommonModule, GoBackComponent, RouterLink, MatDialogModule, ShowDataComponent, TranslateModule, ButtonAdminComponent, LoadingComponent, BreadcrumbAdminComponent, CdkDropList],
  templateUrl: './users-all-admin.component.html'
})
export class UsersAllAdminComponent {

  // Injected instances: MatDialog for opening dialogs, UsersService for fetching user data
  private _dialog = inject(MatDialog); // Injecting MatDialog for opening dialogs
  private _userService = inject(UsersService); // Injecting UsersService for fetching user data
  private _translateService = inject(TranslateService); // Injected TranslateService instance for translations

  // Property to store error messages, initialized to null
  error: string | null = null

  // Property to track loading state, initialized to false
  loading: boolean = false

  // Observable to hold list of private users
  private _userSubject = new BehaviorSubject<User[]>([]);
  users$ = this._userSubject.asObservable() // Observable that fetches all private users
  userById$!: Observable<User>; // Observable that holds a specific user's data

  constructor() {
    this.getAllUsers()
  }

  getAllUsers() {
    this.loading = true; // Set loading state to true before making the API call

    this._userService.getAllUsersPrivate().pipe(
      // Handle any errors that occur during the fetching process
      catchError((error) => {
        // Extract and translate the error message, then set it to the error property
        const message = error.message
        this._translateService.get(message).subscribe((translation) => {
          this.error = translation
        })
        // Return an observable of an empty array to handle errors gracefully
        return of([] as User[])
      }),
      // Ensure loading state is set to false once the API call is complete
      finalize(() => this.loading = false)
    ).subscribe(user => {
      this.loading = false; // Set loading state to false after receiving the response
      this._userSubject.next(user); // Update the BehaviorSubject with the fetched blogs
    })
  }

  /**
   * @method getUserById
   * Fetches a specific user's data by ID from the UsersService.
   * @param id - The ID of the user to fetch
   */
  getUserById(id: string) {
    this.userById$ = this._userService.getUserByIdPublic(id);
  }

  /**
   * @method deleteUser
   * Deletes a user by its ID.
   * After deletion, refreshes the list of users by calling getAllUsers().
   * @param id - ID of the user to delete
   */
  deleteUser(id: string | undefined) {
    if (id) {
      this._userService.deleteUserById(id).subscribe(() => {
        this.getAllUsers()
      })
    }
  }

  /**
   * @method openDialog
   * Opens a dialog showing details of a specific user based on their ID.
   * @param id - Optional ID of the user for whom details are displayed
   */
  openDialog(id?: string) {
    if (id) {
      this.userById$ = this._userService.getUserByIdPublic(id); // Fetch user post details by ID
      openDialogUtil(this._dialog, id, this.getUserById.bind(this), this.userById$, 'full_name', 'user'); // Open dialog with fetched data
    }
  }
}
