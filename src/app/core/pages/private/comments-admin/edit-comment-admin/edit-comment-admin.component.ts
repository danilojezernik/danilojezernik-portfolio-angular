import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {BreadcrumbAdminComponent} from "../../../../../shared/components/breadcrumb-admin/breadcrumb-admin.component";
import {GoBackComponent} from "../../../../../shared/components/go-back/go-back.component";
import {LoadingComponent} from "../../../../../shared/components/loading/loading.component";
import {ReusableFormEditComponent} from "../../../../../shared/forms/reusable-form-edit/reusable-form-edit.component";
import {formCommentConfig} from "../../../../../shared/global-const/form-config";
import {CommentsService} from "../../../../../services/api/comments.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {catchError, map, of} from "rxjs";
import {Comment} from "../../../../../models/comment";

@Component({
  selector: 'app-edit-comment-admin',
  standalone: true,
  imports: [CommonModule, BreadcrumbAdminComponent, GoBackComponent, LoadingComponent, ReusableFormEditComponent],
  templateUrl: './edit-comment-admin.component.html'
})
export class EditCommentAdminComponent implements OnInit {

  // Injected instances: BlogService for managing blog data, ActivatedRoute for accessing route parameters, Router for navigation, TranslateService for translations
  private _commentService = inject(CommentsService)
  private _activatedRoute = inject(ActivatedRoute)
  private _router = inject(Router)
  private _translateService = inject(TranslateService)

  // Property to store error messages, initialized to null
  error: string | null = null;

  // Property to track loading state, initialized to false
  loading: boolean = false;

  // Object to hold the blog data to be edited, initialized to an empty object
  formData: any = {};

  /**
   * @method ngOnInit
   * Lifecycle hook that is called after Angular has initialized all data-bound properties.
   * Retrieves the comment ID from the route parameters and fetches corresponding comment data.
   */
  ngOnInit() {
    const commentId = this._activatedRoute.snapshot.paramMap.get('id') || ''

    // Show spinner while loading
    this.loading = true;

    this._commentService.getCommentByIdAdmin(commentId).pipe(
      map(data => {
        this.formData = data;
        this.loading = false
      }),
      catchError((error) => {
        this.loading = false; // Hide spinner after loading
        // Extract the error message
        const message = error.message;
        // Translate the error message using the Translation service and set it to the error property
        this._translateService.get(message).subscribe((translation) => {
          this.error = translation;
        });
        // Return an observable of an empty array to handle errors gracefully
        return of([] as Comment[]);
      })
    ).subscribe()
  }

  /**
   * @method editComment
   * Updates an existing comment post with new data and navigates to the admin comment page upon success.
   *
   * @param formValue - The form data submitted by the user.
   */

  editComment(formValue: Comment) {

    // Show spinner while loading
    this.loading = true;

    // Retrieve the current blog ID from the route parameters
    const commentId = this._activatedRoute.snapshot.paramMap.get('id') || ''

    this._commentService.editCommentByIdAdmin(commentId, formValue).subscribe(() => {

      // Hide spinner after loading
      this.loading = false;

      // Navigate the user back to the blog admin page after editing is complete
      this._router.navigate([ '/comments-admin' ]);
    }, (error) => {
      console.log('Error editing comment: ', error)
      // Hide spinner after loading
      this.loading = false;
    })
  }

  /**
   * Form configuration for comment
   * Uses predefined formBlogConfig from a global constant file
   */
  protected readonly formCommentConfig = formCommentConfig;
}
