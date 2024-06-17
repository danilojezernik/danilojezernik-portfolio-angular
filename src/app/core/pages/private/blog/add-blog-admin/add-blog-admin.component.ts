import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogService } from "../../../../../services/api/blog.service";
import { BlogModel } from "../../../../../models/blog.model";
import { FormsModule } from "@angular/forms";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { Router } from "@angular/router";

/**
 * @Component AddBlogAdminComponent
 * Component for adding new blog posts in the admin interface.
 */

@Component({
  selector: 'app-add-blog-admin',
  standalone: true,
  imports: [ CommonModule, FormsModule, MatSnackBarModule ],
  templateUrl: './add-blog-admin.component.html'
})
export class AddBlogAdminComponent {

  // Injected instances: BlogService for managing blog data, MatSnackBar for displaying notifications, Router for navigation
  private _blogService = inject(BlogService); // Injecting BlogService for managing blog data
  private _snackBar = inject(MatSnackBar); // Injecting MatSnackBar for displaying notifications
  private _router = inject(Router); // Injecting Router for navigating between routes

  // Properties to bind to form inputs
  addNaslov: string = ''; // Title of the blog post
  addPodnaslov: string = ''; // Subtitle of the blog post
  addKategorija: string = ''; // Category of the blog post
  addVsebina: string = ''; // Content of the blog post
  addImage: string = ''; // Image URL for the blog post

  /**
   * @method addNewBlog
   * Method to add a new blog post based on form inputs.
   * Validates required fields and calls BlogService to add the new blog post.
   * Navigates back to the blog admin page after successful addition.
   */
  addNewBlog() {
    // Prepare new blog post data based on form inputs
    const newData: BlogModel = {
      naslov: this.addNaslov,
      podnaslov: this.addPodnaslov,
      kategorija: this.addKategorija,
      vsebina: this.addVsebina,
      image: this.addImage,
      datum_vnosa: new Date().toISOString() // Timestamp of when the blog post was added
    };

    // Validate if required fields (title and content) are empty
    if ((newData.naslov && newData.vsebina) === '') {
      this._snackBar.open('Insert naslov and vsebino'); // Display a snack bar notification if fields are empty
    } else {
      // Call BlogService to add the new blog post
      this._blogService.addBlog(newData).subscribe();
      // Navigate to the blog admin page after successful addition
      this._router.navigate([ 'blog-admin' ]);
    }
  }

}
