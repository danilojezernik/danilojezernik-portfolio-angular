import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {UsersService} from "../../../../../services/api/users.service";
import {formUserDashboardConfig} from "../../../../../shared/global-const/form-config";
import {ReusableFormEditComponent} from "../../../../../shared/forms/reusable-form-edit/reusable-form-edit.component";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {UserProfile} from "../../../../../models/user-profile";
import {map, Observable, of, switchMap, tap} from "rxjs";
import {BreadcrumbAdminComponent} from "../../../../../shared/components/breadcrumb-admin/breadcrumb-admin.component";
import {GoBackComponent} from "../../../../../shared/components/go-back/go-back.component";
import {LoadingComponent} from "../../../../../shared/components/loading/loading.component";
import {HeroTitleComponent} from "../../../../../shared/components/hero-title/hero-title.component";
import {BUTTONS, SNACKBAR_MESSAGES} from "../../../../../shared/global-const/global.const";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ButtonAdminComponent} from "../../../../../shared/components/button-admin/button-admin.component";
import {RouterLink} from "@angular/router";
import {User} from "../../../../../models/user";
import {AuthService} from "../../../../../auth/auth.service";

@Component({
  selector: 'app-user-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ReusableFormEditComponent, BreadcrumbAdminComponent, GoBackComponent, LoadingComponent, TranslateModule, HeroTitleComponent, ButtonAdminComponent, RouterLink],
  templateUrl: './user-dashboard.component.html'
})
export class UserDashboardComponent implements OnInit {

  // Injected instances: UsersService for user data, ActivatedRoute for route parameters, Router for navigation
  private _userService = inject(UsersService); // Injected UsersService instance
  private _snack = inject(MatSnackBar)
  private _translateService = inject(TranslateService); // Injecting TranslateService for translating error messages
  private _authService = inject(AuthService);

  // Property to store error messages, initialized to null
  error: string | null = null;

  userRole: string

  // Property to track loading state, initialized to false
  loading: boolean = false;
  changing: boolean = false;

  // Object to hold the user data to be edited
  formData: any = {};
  user$: Observable<User | null>;

  ngOnInit(): void {
    this.loading = true;
    // Use switchMap to first get the user profile, then get the user data based on the username
    this.user$ = this._userService.getUserProfile().pipe(
      switchMap((profile: UserProfile) => {
        if (profile.username) {
          return this._userService.getUserByUsernameAdmin(profile.username)
        } else {
          return of(null);  // Return null if no username is found
        }
      }),
      tap((userData: User | null) => {
        if (userData) {
          this.formData = {...this.formData, ...userData};
        }
        this.loading = false;
      })
    );

    this.userRole = this._authService.decodeRoleFromToken();

  }


  // Submit the updated profile data to the backend
  onSubmit(formValidator: UserProfile): void {
    this.loading = true;
    this.changing = true;

    this._userService.updateUserProfile(formValidator).subscribe(
      () => {
        this.loading = false;
        this.changing = false;

        this._translateService.get([SNACKBAR_MESSAGES.dataChanged, SNACKBAR_MESSAGES.close]).subscribe((translation) => {
          this._snack.open(translation[SNACKBAR_MESSAGES.dataChanged], translation[SNACKBAR_MESSAGES.close], {
            duration: 3000
          })
        })

        // Update data in inputs with new data
        this._userService.getUserProfile().pipe(
          map(data => this.formData = data),
          tap(data => console.log(data))
        ).subscribe()
      }, (error) => {
        this.loading = false;
        this.changing = false;

        // Extract the error message
        const message = error.message;

        // Translate the error message using the Translation service and set it to the error property
        this._translateService.get(message).subscribe((translation) => {
          this.error = translation;
        });

      }
    );
  }

  protected readonly formUserDashboardConfig = formUserDashboardConfig;
  protected readonly BUTTONS = BUTTONS;
}
