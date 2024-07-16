import { Component, inject } from '@angular/core'
import { CommonModule } from '@angular/common'
import { BlogService } from "../../../../../services/api/blog.service"
import { RouterLink } from "@angular/router"
import { GoBackComponent } from "../../../../../shared/components/go-back/go-back.component"
import { BehaviorSubject, Observable } from "rxjs"
import { ShowDataComponent } from "../../../../../shared/components/show-data/show-data.component"
import { MatDialog, MatDialogModule } from "@angular/material/dialog"
import { BlogModel } from "../../../../../models/blog.model"
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
export class BlogAllAdminComponent {

  // Injected instances: BlogService for blog data and MatDialog for dialogs
  private _blogService = inject(BlogService); // Injected BlogService instance
  private _dialog = inject(MatDialog); // Injected MatDialog instance for dialogs

  // BehaviorSubject to store list of blogs
  private _blogSubject = new BehaviorSubject<BlogModel[]>([]);

  // Observables to expose the blog list
  blogs$ = this._blogSubject.asObservable(); // Observable to store list of blogs
  blogById$!: Observable<BlogModel>; // Observable to store a single blog item

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
   */
  getAllBlogs() {
    this._blogService.getAllBlogsAdmin().subscribe(blog => {
      this._blogSubject.next(blog)
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
        this.getAllBlogs()
      })
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
}
