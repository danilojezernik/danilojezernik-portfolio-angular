import { Component, inject, OnInit } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BlogService } from "../../../../../services/api/blog.service"
import { RouterLink } from "@angular/router"
import { GoBackComponent } from "../../../../../shared/components/go-back/go-back.component"
import { Observable } from "rxjs"
import { ShowDataTestComponent } from "../../../../../shared/components/show-data-test/show-data-test.component"
import { MatDialog, MatDialogModule } from "@angular/material/dialog"
import {
  DialogGlobalAdminComponent
} from "../../../../../shared/components/dialogs/dialog-global-admin/dialog-global-admin.component"
import { BlogModel } from "../../../../../models/blog.model"
import { DIALOG_DIMENSIONS } from "../../../../../shared/global-const/global.const";

/**
 * Component for managing blog administration.
 * Displays a list of blogs and allows viewing and deleting individual blog posts.
 */
@Component({
  selector: 'app-blog-all-admin',
  standalone: true,
  imports: [ CommonModule, RouterLink, GoBackComponent, ShowDataTestComponent, MatDialogModule ],
  templateUrl: './blog-all-admin.component.html'
})
export class BlogAllAdminComponent implements OnInit {

  // Inject BlogService for retrieving blog data and MatDialog for displaying dialogs
  private _blogService = inject(BlogService) // Injected BlogService instance
  public dialog = inject(MatDialog) // Injected MatDialog instance for dialogs

  // Observable to hold list of blogs and a single blog item
  blogs$!: Observable<BlogModel[]> // Observable to store list of blogs
  blogById$!: Observable<BlogModel> // Observable to store a single blog item

  /**
   * Lifecycle hook that runs when the component initializes.
   * Calls getAllBlogs() to fetch all blogs from the service.
   */
  ngOnInit() {
    this.getAllBlogs() // Initialize component by fetching all blogs
  }

  /**
   * Fetches all blogs from the BlogService and assigns them to blogs$.
   */
  getAllBlogs() {
    this.blogs$ = this._blogService.getAllBlogsAdmin()
  }

  /**
   * Fetches a single blog post by its ID from the BlogService and assigns it to blogById$.
   * @param id - ID of the blog post to fetch
   */
  getBlogById(id: string) {
    this.blogById$ = this._blogService.getBlogById(id)
  }

  /**
   * Deletes a blog post by its ID.
   * After deletion, refreshes the list of blogs by calling getAllBlogs().
   * @param id - ID of the blog post to delete
   */
  deleteById(id: string | undefined) {
    if (id) {
      // Call BlogService to delete the blog post by ID
      this._blogService.deleteBlogById(id).subscribe(
        () => {
          this.getAllBlogs() // Refresh the list of blogs after successful deletion
        },
        (error) => {
          console.error('Failed to delete blog:', error) // Log error message if deletion fails
        }
      )
    } else {
      console.error('Blog by id doesn\'t exist') // Log error if ID is undefined
    }
  }

  /**
   * Opens a dialog to display details of a specific blog post.
   * Fetches the blog post details by ID and passes them to the DialogGlobalAdminComponent.
   * @param id - ID of the blog post to display in the dialog
   */
  openDialog(id?: string) {
    if (id) {
      // Fetch blog details by ID from BlogService
      this.getBlogById(id)
      // Subscribe to blogById$ Observable to get blog data
      this.blogById$.subscribe(data => {
        // Open a dialog component to display blog details
        this.dialog.open(DialogGlobalAdminComponent, {
          data: {
            title: data.naslov, // Set dialog title to blog title
            allData: data // Pass all blog data to the dialog
          },
          ...DIALOG_DIMENSIONS.admin
        })
      })
    } else {
      console.error('Blog ID is undefined') // Log error if ID is undefined
    }
  }

}
