import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from "@angular/router";
import { BlogService } from "../../../../../services/api/blog.service";
import { catchError, Observable, of } from "rxjs";
import { BlogModel } from "../../../../../models/blog.model";
import { LoadingComponent } from "../../../../../shared/components/loading/loading.component";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-blog-by-id',
  standalone: true,
  imports: [ CommonModule, LoadingComponent ],
  templateUrl: './blog-by-id.component.html'
})
export class BlogByIdComponent implements OnInit {

  private _activatedRouter = inject(ActivatedRoute)
  private _blogService = inject(BlogService)
  private _translateService = inject(TranslateService)

  // Property to store error messages, initialized to null
  error: string | null = null

  blogId$!: Observable<BlogModel>

  ngOnInit() {
    const blogId = this._activatedRouter.snapshot.paramMap.get('id') || ''

    if (blogId)
      this.getBlogById(blogId)
  }

  getBlogById(blogId: string) {
    this.blogId$ = this._blogService.getBlogById(blogId).pipe(
      // 'catchError' is used to handle any errors that occur during the fetching process
      catchError((error) => {
        // Extract the error message
        const message = error.message
        // Translate the error message using the Translation service and set it to the error property
        this._translateService.get(message).subscribe((translation) => {
          this.error = translation
        })
        // Return an observable of an empty array to handle errors gracefully
        return of({} as BlogModel)
      })
    )
  }

}
