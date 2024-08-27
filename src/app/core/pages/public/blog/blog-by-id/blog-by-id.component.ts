import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute} from "@angular/router";
import {BlogService} from "../../../../../services/api/blog.service";
import {catchError, Observable, of, switchMap} from "rxjs";
import {BlogModel} from "../../../../../models/blog.model";
import {LoadingComponent} from "../../../../../shared/components/loading/loading.component";
import {TranslateService} from "@ngx-translate/core";
import {GetImageService} from "../../../../../services/get-image/get-image.service";
import {SlovenianDateTransformPipe} from "../../../../../pipes/date-transform/slovenian-date-transform.pipe";
import {CommentsService} from "../../../../../services/api/comments.service";
import {Comment} from "../../../../../models/comment";
import {ReusableFormAddComponent} from "../../../../../shared/forms/reusable-form-add/reusable-form-add.component";
import {formCommentConfig} from "../../../../../shared/global-const/form-config";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-blog-by-id',
  standalone: true,
  imports: [CommonModule, LoadingComponent, SlovenianDateTransformPipe, ReusableFormAddComponent, ReactiveFormsModule],
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

  commentForm: FormGroup = new FormGroup({})
  blogId$!: Observable<BlogModel>
  commentId$!: Observable<Comment[]>

  ngOnInit() {
    const blogId = this._activatedRouter.snapshot.paramMap.get('id') || ''

    this.commentForm = this._fb.group({
      author: [''],
      content: ['']
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

  addComment() {
    const blogId = this._activatedRouter.snapshot.paramMap.get('id') || ''
    const formValues = this.commentForm.value

    const commentData: Comment = {
      author: formValues.author,
      blog_id: blogId,
      content: formValues.content,
      datum_vnosa: new Date().toISOString()
    }

    this._commentService.addCommentToBlogPost(blogId, commentData).pipe(
      // After adding the comment, refresh the comments
      switchMap(() => this._commentService.getCommentsOfBlogPublic(blogId)),
      catchError((error) => {
        const message = error.message
        this._translateService.get(message).subscribe((translation) => {
          this.error = translation
        })
        return of([] as Comment[])
      })
    ).subscribe((comments) => {
      this.commentId$ = of(comments)
      this.commentForm.reset()
    })
  }

  getCommentOfBlog(blogId: string) {
    this.commentId$ = this._commentService.getCommentsOfBlogPublic(blogId).pipe(
      catchError((error) => {
        const message = error.message
        this._translateService.get(message).subscribe((translation) => {
          this.error = translation
        })
        return of([] as Comment[])
      })
    )
  }


  protected readonly formCommentConfig = formCommentConfig;
}
