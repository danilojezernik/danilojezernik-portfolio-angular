import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersService} from "../../../../../services/api/users.service";
import {catchError, map, of} from "rxjs";
import {RouterLink} from "@angular/router";
import {GoBackComponent} from "../../../../../shared/components/go-back/go-back.component";
import {TranslateService} from "@ngx-translate/core";
import {LoadingComponent} from "../../../../../shared/components/loading/loading.component";
import {HeroTitleComponent} from "../../../../../shared/components/hero-title/hero-title.component";
import {SocialPlatformsComponent} from "../../../../../shared/components/social-platforms/social-platforms.component";


@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, RouterLink, GoBackComponent, LoadingComponent, HeroTitleComponent, SocialPlatformsComponent],
  templateUrl: './users.component.html'
})
export class UsersComponent {

  private _userService = inject(UsersService)
  private _translateService = inject(TranslateService)

  // Property to store error messages, initialized to null
  error: string | null = null

  users$ = this._userService.getAllUsersPublic().pipe(
    map(user => user.map(data => ({
        _id: data._id,
        username: data.username,
        full_name: data.full_name,
        facebook: data.facebook,
        instagram: data.instagram,
        youtube: data.youtube,
        twitter: data.twitter,
        github: data.github,
        www: data.www,
        profession: data.profession,
        datum_vnosa: data.datum_vnosa
      })
    )),
    // 'catchError' is used to handle any errors that occur during the fetching process
    catchError((error) => {
      // Extract the error message
      const message = error.message
      // Translate the error message using the Translation service and set it to the error property
      this._translateService.get(message).subscribe((translation) => {
        this.error = translation
      })
      // Return an observable of an empty array to handle errors gracefully
      return of([] as {
        _id: string,
        username: string,
        datum_vnosa: string,
        full_name: string,
        youtube: string,
        profession: string,
        facebook: string,
        instagram: string,
        twitter: string,
        github: string,
        www: string
      }[])
    })
  )

}
