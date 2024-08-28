import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {CommentsService} from "../../../../../services/api/comments.service";
import {BehaviorSubject, catchError, finalize, Observable, of} from "rxjs";
import {Comment} from "../../../../../models/comment";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {RouterLink} from "@angular/router";
import {ShowDataComponent} from "../../../../../shared/components/show-data/show-data.component";
import {ButtonAdminComponent} from "../../../../../shared/components/button-admin/button-admin.component";
import {MatDialog} from "@angular/material/dialog";
import {openDialogUtil} from "../../../../../utils/open-dialog.util";
import {BreadcrumbAdminComponent} from "../../../../../shared/components/breadcrumb-admin/breadcrumb-admin.component";

@Component({
  selector: 'app-comments-all-admin',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterLink, ShowDataComponent, ButtonAdminComponent, BreadcrumbAdminComponent],
  templateUrl: './comments-all-admin.component.html'
})
export class CommentsAllAdminComponent {

  private _commentsService = inject(CommentsService)
  private _dialog = inject(MatDialog); // Inject the MatDialog service to open dialogs
  private _translateService = inject(TranslateService); // Injected TranslateService instance for translations

  // Property to store error messages, initialized to null
  error: string | null = null
  // Property to track loading state, initialized to false
  loading: boolean = false

  // BehaviorSubject to store list of comments
  private _commentsSubject = new BehaviorSubject<Comment[]>([])

  // Observable to expose the comments list
  comments$ = this._commentsSubject.asObservable()

  commentById$!: Observable<Comment>

  constructor() {
    this.getAllComments()
  }

  getAllComments() {
    this.loading = true

    this._commentsService.getAllCommentsAdmin().pipe(
      catchError((error) => {
        const message = error.message
        this._translateService.get(message).subscribe((translation) => {
          this.error = translation
        })

        return of([] as Comment[])
      }),
      finalize(() => this.loading = false)
    ).subscribe(comment => {
      this.loading = false
      this._commentsSubject.next(comment)
    })
  }

  getCommentById(id: string) {
    this.commentById$ = this._commentsService.getCommentByIdAdmin(id)
  }

  /**
   * @method deleteComment
   * Deletes a blog post by its ID.
   * After deletion, refreshes the list of blogs by calling getAllBlogs().
   * @param blogId
   * @param commentId
   */
  deleteComment(blogId: string, commentId?: string) {
    if (blogId && commentId) {
      this._commentsService.deleteCommentById(blogId, commentId).subscribe(() => {
        this.getAllComments(); // Refresh the list of blogs after deletion
      })
    }
  }

  /**
   * @method openDialog
   * Opens a dialog to view or edit a blog by its ID.
   * Fetches the blog details and uses a utility function to open the dialog.
   * @param id - ID of the blog to fetch and display in the dialog
   */
  openDialog(id?: string) {
    if (id) {
      this.commentById$ = this._commentsService.getCommentByIdAdmin(id); // Fetch comment post details by ID
      openDialogUtil(this._dialog, id, this.getCommentById.bind(this), this.commentById$, 'author', 'comment'); // Open dialog with fetched data
    }
  }

}
