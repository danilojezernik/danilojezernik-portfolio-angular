import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {BlogService} from "../../../services/api/blog.service";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {GetImageService} from "../../../services/get-image/get-image.service";
import {catchError, of} from "rxjs";
import {BlogModel} from "../../../models/blog.model";
import {HeroTitleComponent} from "../hero-title/hero-title.component";
import {LoadingComponent} from "../loading/loading.component";
import {ShorteningTextPipe} from "../../../pipes/shortening-text/shortening-text.pipe";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-latest-blogs',
  standalone: true,
  imports: [CommonModule, HeroTitleComponent, LoadingComponent, ShorteningTextPipe, TranslateModule, RouterLink],
  templateUrl: './latest-blogs.component.html'
})
export class LatestBlogsComponent {

  private _blogService = inject(BlogService)
  private _translateService = inject(TranslateService)
  protected _getImageByName = inject(GetImageService)

  // Property to store error messages, initialized to null
  error: string | null = null

  blog$ = this._blogService.gesBlogsLimited().pipe(
    // 'catchError' is used to handle any errors that occur during the fetching process
    catchError((error) => {
      // Extract the error message
      const message = error.message
      // Translate the error message using the Translation service and set it to the error property
      this._translateService.get(message).subscribe((translation) => {
        this.error = translation
      })
      // Return an observable of an empty array to handle errors gracefully
      return of([] as BlogModel[])
    })
  )

}
