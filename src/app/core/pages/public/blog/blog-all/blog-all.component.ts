import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogService } from "../../../../../services/api/blog.service";
import { RouterLink } from "@angular/router";
import { LoadingComponent } from "../../../../../shared/components/loading/loading.component";
import { catchError, of } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
import { BlogModel } from "../../../../../models/blog.model";
import {GetImageService} from "../../../../../services/get-image/get-image.service";

@Component({
  selector: 'app-blog-all',
  standalone: true,
  imports: [ CommonModule, RouterLink, LoadingComponent ],
  templateUrl: './blog-all.component.html'
})
export class BlogAllComponent {

  private _blogService = inject(BlogService)
  private _translateService = inject(TranslateService)
  protected _getImageByName = inject(GetImageService)

  // Property to store error messages, initialized to null
  error: string | null = null

  blog$ = this._blogService.getAllBlogs().pipe(
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
