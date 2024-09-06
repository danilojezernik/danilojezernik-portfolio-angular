import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersService } from "../../../../../services/api/users.service";
import { ActivatedRoute } from "@angular/router";
import {catchError, map, Observable, of} from "rxjs";
import { GoBackComponent } from "../../../../../shared/components/go-back/go-back.component";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {SlovenianDateTransformPipe} from "../../../../../pipes/date-transform/slovenian-date-transform.pipe";
import {MatDialog} from "@angular/material/dialog";
import {
  DialogSendEmailComponent
} from "../../../../../shared/components/dialogs/dialog-send-email/dialog-send-email.component";
import {DIALOG_DIMENSIONS} from "../../../../../shared/global-const/global.const";
import {MatSidenavModule} from "@angular/material/sidenav";
import {ReusableFormAddComponent} from "../../../../../shared/forms/reusable-form-add/reusable-form-add.component";
import {formEmailToRegisteredUserConfig} from "../../../../../shared/global-const/form-config";
import {AuthService} from "../../../../../auth/auth.service";
import {SocialPlatformsComponent} from "../../../../../shared/components/social-platforms/social-platforms.component";

export interface UserId {
  _id?: string;
  username: string;
  full_name: string;
  email: string;
  profession: string;
  technology: string;
  description: string;
  facebook?: string;
  youtube?: string;
  instagram?: string;
  twitter?: string;
  github?: string;
  www?: string;
  datum_vnosa: string;
}


@Component({
  selector: 'app-user-by-id',
  standalone: true,
  imports: [CommonModule, GoBackComponent, SlovenianDateTransformPipe, TranslateModule, MatSidenavModule, ReusableFormAddComponent, SocialPlatformsComponent],
  templateUrl: './user-by-id.component.html'
})
export class UserByIdComponent implements OnInit {

  private _userService = inject(UsersService)
  private _route = inject(ActivatedRoute)
  private _translateService = inject(TranslateService)
  private _dialog = inject(MatDialog)
  private _authService = inject(AuthService);

  // Property to store error messages, initialized to null
  error: string | null = null

  userId$!: Observable<UserId>
  userRole: string

  ngOnInit() {
    this.userRole = this._authService.decodeRoleFromToken();
    const userId = this._route.snapshot.paramMap.get('id') || ''

    if (userId)
      this.getUserById(userId)
  }

  getUserById(id: string) {
    this.userId$ = this._userService.getUserByIdPublic(id).pipe(
      map(data => ({
        _id: data._id,
        username: data.username,
        full_name: data.full_name,
        email: data.email,
        profession: data.profession,
        technology: data.technology,
        description: data.description,
        facebook: data.facebook,
        youtube: data.youtube,
        instagram: data.instagram,
        twitter: data.twitter,
        github: data.github,
        www: data.www,
        datum_vnosa: data.datum_vnosa
      })),
      catchError((error) => {
        const message = error.message;
        this._translateService.get(message).subscribe((translation) => {
          this.error = translation;
        });
        return of({} as UserId);
      })
    )
  }

  openDialog(user_id: string, user: string) {
    this._dialog.open(DialogSendEmailComponent, {
      data: {
        user_id: user_id,
        user: user
      },
      panelClass: 'email-dialog', // Add this line for custom class
      ...DIALOG_DIMENSIONS.email
    })
  }

  protected readonly formEmailToRegisteredUserConfig = formEmailToRegisteredUserConfig;
}
