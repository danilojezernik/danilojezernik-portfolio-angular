import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BlogService } from "../../../../../services/api/blog.service"
import { RouterLink } from "@angular/router"
import { GoBackComponent } from "../../../../../shared/components/go-back/go-back.component"
import { BehaviorSubject, catchError, finalize, Observable, of } from "rxjs"
import { ShowDataComponent } from "../../../../../shared/components/show-data/show-data.component"
import { MatDialog, MatDialogModule } from "@angular/material/dialog"
import { BlogModel } from "../../../../../models/blog.model"
import { openDialogUtil } from "../../../../../utils/open-dialog.util";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { ButtonAdminComponent } from "../../../../../shared/components/button-admin/button-admin.component";
import { LoadingComponent } from "../../../../../shared/components/loading/loading.component";
import { DialogAdminService } from "../../../../../services/dialog-admin/dialog-admin.service";

/**
 * @Component BlogAllAdminComponent
 * Component for managing blog administration.
 * Displays a list of blogs and allows viewing and deleting individual blog posts.
 */

@Component({
  selector: 'app-blog-all-admin',
  standalone: true,
  imports: [ CommonModule, RouterLink, GoBackComponent, ShowDataComponent, MatDialogModule, TranslateModule, ButtonAdminComponent, LoadingComponent ],
  templateUrl: './blog-all-admin.component.html'
})
export class BlogAllAdminComponent {

  // Injected instances: BlogService for blog data, MatDialog for dialogs, and TranslateService for translations
  private _blogService = inject(BlogService); // Injected BlogService instance
  private _dialog = inject(MatDialog); // Injected MatDialog instance for dialogs
  private _openDialog = inject(DialogAdminService)
  private _translateService = inject(TranslateService); // Injected TranslateService instance for translations

  // Property to store error messages, initialized to null
  error: string | null = null
  // Property to track loading state, initialized to false
  loading: boolean = false

  // BehaviorSubject to store list of blogs
  private _blogSubject = new BehaviorSubject<BlogModel[]>([]);

  // Observable to expose the blog list
  blogs$ = this._blogSubject.asObservable()

  // Observable to store a single blog item fetched by ID
  blogById$!: Observable<BlogModel>;

  /**
   * Constructor to initialize the component.
   * Calls the getAllBlogs method to load all blog posts.
   */
  constructor() {
    this.getAllBlogs()
  }

  /**
   * @method getAllBlogs
   * Fetches all blogs from the BlogService and assigns them to blogs$.
   * Also handles loading state and error messages.
   */
  getAllBlogs() {
    this.loading = true; // Set loading state to true before making the API call

    this._blogService.getAllBlogsAdmin().pipe(
      // Handle any errors that occur during the fetching process
      catchError((error) => {
        // Extract and translate the error message, then set it to the error property
        const message = error.message
        this._translateService.get(message).subscribe((translation) => {
          this.error = translation
        })
        // Return an observable of an empty array to handle errors gracefully
        return of([] as BlogModel[])
      }),
      // Ensure loading state is set to false once the API call is complete
      finalize(() => this.loading = false)
    ).subscribe(blog => {
      this.loading = false; // Set loading state to false after receiving the response
      this._blogSubject.next(blog); // Update the BehaviorSubject with the fetched blogs
    })
  }

  /**
   * @method getBlogById
   * Fetches a single blog post by its ID from the BlogService and assigns it to blogById$.
   * @param id - ID of the blog post to fetch
   */
  getBlogById(id: string) {
    this.blogById$ = this._blogService.getBlogById(id);
  }

  /**
   * @method deleteBlog
   * Deletes a blog post by its ID.
   * After deletion, refreshes the list of blogs by calling getAllBlogs().
   * @param id - ID of the blog post to delete
   */
  deleteBlog(id?: string) {
    if (id) {
      this._blogService.deleteBlogById(id).subscribe(() => {
        this.getAllBlogs(); // Refresh the list of blogs after deletion
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
      this.blogById$ = this._blogService.getBlogById(id); // Fetch blog post details by ID
      this._openDialog.openDialogUtil(id, this.getBlogById.bind(this), this.blogById$, 'title', 'blog'); // Open dialog with fetched data
    }
  }
}
