import { Component, inject, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BlogService } from "../../../../../services/api/blog.service"
import { RouterLink } from "@angular/router"
import { GoBackComponent } from "../../../../../shared/components/go-back/go-back.component"
import { Observable } from "rxjs"
import { ShowDataComponent } from "../../../../../shared/components/show-data/show-data.component"
import { MatDialog, MatDialogModule } from "@angular/material/dialog"
import { BlogModel } from "../../../../../models/blog.model"
import { BUTTONS } from "../../../../../shared/global-const/global.const";
import { openDialogUtil } from "../../../../../utils/open-dialog.util";
import { TranslateModule } from "@ngx-translate/core";
import { ButtonAdminComponent } from "../../../../../shared/components/button-admin/button-admin.component";

/**
 * @Component BlogAllAdminComponent
 * Component for managing blog administration.
 * Displays a list of blogs and allows viewing and deleting individual blog posts.
 */

@Component({
  selector: 'app-blog-all-admin',
  standalone: true,
  imports: [ CommonModule, RouterLink, GoBackComponent, ShowDataComponent, MatDialogModule, TranslateModule, ButtonAdminComponent ],
  templateUrl: './blog-all-admin.component.html'
})
export class BlogAllAdminComponent implements OnInit {

  // Injected instances: BlogService for blog data and MatDialog for dialogs
  private _blogService = inject(BlogService); // Injected BlogService instance
  public _dialog = inject(MatDialog); // Injected MatDialog instance for dialogs

  // Observables to manage blog data
  blogs$!: Observable<BlogModel[]>; // Observable to store list of blogs
  blogById$!: Observable<BlogModel>; // Observable to store a single blog item

  /**
   * @method ngOnInit
   * Lifecycle hook that initializes the component.
   * Calls getAllBlogs() to fetch all blogs from the service.
   */
  ngOnInit() {
    this.getAllBlogs(); // Initialize component by fetching all blogs
  }

  /**
   * @method getAllBlogs
   * Fetches all blogs from the BlogService and assigns them to blogs$.
   */
  getAllBlogs() {
    this.blogs$ = this._blogService.getAllBlogsAdmin();
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
  deleteBlog(id: string | undefined) {
    if (id) {
      // Call BlogService to delete the blog post by ID
      this._blogService.deleteBlogById(id).subscribe(
        () => {
          this.getAllBlogs(); // Refresh the list of blogs after successful deletion
        },
        (error) => {
          console.error('Failed to delete blog:', error); // Log error message if deletion fails
        }
      );
    } else {
      console.error('Blog by id doesn\'t exist'); // Log error if ID is undefined
    }
  }

  /**
   * Method to open the dialog with blog details
   * @param id - ID of the blog to fetch and display in the dialog
   */
  openDialog(id?: string) {
    if (id) {
      this.blogById$ = this._blogService.getBlogById(id); // Fetch blog post details by ID
      openDialogUtil(this._dialog, id, this.getBlogById.bind(this), this.blogById$, 'title', 'blog'); // Open dialog with fetched data
    }
  }

  protected readonly BUTTONS = BUTTONS;
}
