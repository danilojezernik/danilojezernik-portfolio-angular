import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from "@angular/router";
import {BlogService} from "../../../../../services/api/blog.service";
import {catchError, Observable, of, switchMap, tap} from "rxjs";
import {BlogModel} from "../../../../../models/blog.model";
import {LoadingComponent} from "../../../../../shared/components/loading/loading.component";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {GetImageService} from "../../../../../services/get-image/get-image.service";
import {SlovenianDateTransformPipe} from "../../../../../pipes/date-transform/slovenian-date-transform.pipe";
import {CommentsService} from "../../../../../services/api/comments.service";
import {Comment} from "../../../../../models/comment";
import {ReusableFormAddComponent} from "../../../../../shared/forms/reusable-form-add/reusable-form-add.component";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {PAGINATION} from "../../../../../shared/global-const/global.const";
import {GoBackComponent} from "../../../../../shared/components/go-back/go-back.component";

@Component({
  selector: 'app-blog-by-id',
  standalone: true,
  imports: [CommonModule, LoadingComponent, SlovenianDateTransformPipe, ReusableFormAddComponent, ReactiveFormsModule, TranslateModule, GoBackComponent],
  templateUrl: './blog-by-id.component.html'
})
export class BlogByIdComponent implements OnInit {

  private _activatedRouter = inject(ActivatedRoute)
  private _fb = inject(FormBuilder)
  private _commentService = inject(CommentsService)
  private _blogService = inject(BlogService)
  private _translateService = inject(TranslateService)
  protected _getImageByName = inject(GetImageService)

  // Property to store error messages, initialized to null
  error: string | null = null
  role = localStorage.getItem('role')

  commentForm: FormGroup = new FormGroup({})
  blogId$!: Observable<BlogModel>
  commentId$!: Observable<Comment[]>

  // PAGINATION variables
  commentLength = 0
  currentOffset = 0
  limit = PAGINATION.commentLImit // Show first number of random comments comments initially
  totalComments = 0 // To track the total number of comments available

  ngOnInit() {
    const blogId = this._activatedRouter.snapshot.paramMap.get('id') || ''

    this.commentForm = this._fb.group({
      author: ['', Validators.required ],
      content: ['', Validators.required ]
    })

    if (blogId) {
      this.getBlogById(blogId)
      this.getCommentOfBlog(blogId)
    }
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

  // Adds a new comment and refreshes the comment list
  addComment() {

    const blogId = this._activatedRouter.snapshot.paramMap.get('id') || ''
    const formValues = this.commentForm.value

    const commentData: Comment = {
      author: formValues.author,
      blog_id: blogId,
      content: formValues.content,
      datum_vnosa: new Date().toISOString()
    }

    if(!(commentData.content && commentData.author)) return

    // Submit the comment and refresh the comments list
    this._commentService.addCommentToBlogPost(blogId, commentData).pipe(
      switchMap(() => this._commentService.getCommentsOfBlogPublic(blogId, this.limit, this.currentOffset).pipe(
        // PAGINATION: Update the observable with the new list of comments, after sorting or pagination
        tap(response => {
          this.commentId$ = of(response.comments);
          this.commentLength = response.total_count;

          // PAGINATION: Update the total number of comments available
          this.totalComments = response.total_count || 0;
        })
      )),
      catchError((error) => {
        const role = localStorage.getItem('role')
        if(!role) {
          const message = 'errors.notRegistered'
          this._translateService.get(message).subscribe((translation) => {
            this.error = translation
          })
          return of(this.error)
        } else {
          const message = error.message
          this._translateService.get(message).subscribe((translation) => {
            this.error = translation
          })
          return of([] as Comment[])
        }
      })
    ).subscribe(() => {
      this.commentForm.reset()
    })
  }

  // Fetches comments for the blog by ID with pagination support
  getCommentOfBlog(blogId: string) {
    this._commentService.getCommentsOfBlogPublic(blogId, this.limit, this.currentOffset).pipe(
      // PAGINATION: Update the observable with the fetched comments
      tap(response => {
        this.commentId$ = of(response.comments);
        this.commentLength = response.total_count;

        // PAGINATION: Update the total number of comments available
        this.totalComments = response.total_count || 0;
      }),
      catchError(() => {
        return of([] as Comment[])
      })
    ).subscribe()
  }

  // PAGINATION: Load the next set of comments
  loadNextComments() {
    if (this.currentOffset + this.limit < this.totalComments) {
      this.currentOffset += this.limit
      this.getCommentOfBlog(this._activatedRouter.snapshot.paramMap.get('id') || '')
    }
  }

  // PAGINATION: Load the previous set of comments
  loadPreviousComments() {
    if (this.currentOffset > 0) {
      this.currentOffset = Math.max(0, this.currentOffset - this.limit)
      this.getCommentOfBlog(this._activatedRouter.snapshot.paramMap.get('id') || '')
    }
  }
}
