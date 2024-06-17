import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogService } from "../../../../../services/api/blog.service";
import { ActivatedRoute, Router } from "@angular/router";
import { map } from "rxjs";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BlogModel } from "../../../../../models/blog.model";
import { GoBackComponent } from "../../../../../shared/components/go-back/go-back.component";

/**
 * @Component BlogEditByIdAdminComponent
 * Represents the component responsible for editing a blog post by ID in the admin interface.
 */

@Component({
  selector: 'app-blog-edit-by-id-admin',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, FormsModule, GoBackComponent ],
  templateUrl: './blog-edit-by-id-admin.component.html'
})
export class BlogEditByIdAdminComponent implements OnInit {

  // Private variables to inject services
  private _blogService = inject(BlogService); // Service for blog-related operations
  private _activatedRoute = inject(ActivatedRoute); // Provides access to route parameters
  private _router = inject(Router); // Helps navigate between routes

  // Form input fields bound to component properties
  addNaslov: string = ''; // Title of the blog post
  addPodnaslov: string = ''; // Subtitle of the blog post
  addKategorija: string = ''; // Category of the blog post
  addVsebina: string = ''; // Content/body of the blog post
  addImage: string = ''; // URL of the image associated with the blog post

  /**
   * @method ngOnInit
   * Lifecycle hook that is called after Angular has initialized all data-bound properties.
   * Retrieves the blog ID from the route parameters and fetches corresponding blog data.
   */
  ngOnInit() {
    // Retrieve the blog ID from the route parameters
    const blogId = this._activatedRoute.snapshot.paramMap.get('id') || '';

    // Fetch the blog data using the BlogService based on the retrieved ID
    this._blogService.getBlogById(blogId).pipe(
      map(data => {
        // Populate component properties with fetched blog data
        this.addNaslov = data.naslov;
        this.addPodnaslov = data.podnaslov;
        this.addVsebina = data.vsebina;
        this.addKategorija = data.kategorija;
        this.addImage = data.image;
      })
    ).subscribe();
  }

  /**
   * @method editBlog
   * Updates an existing blog post with new data and navigates to the admin blog page upon success.
   */
  editBlog() {
    // Prepare a new BlogModel object with updated values from form inputs
    const addNew: BlogModel = {
      naslov: this.addNaslov,
      podnaslov: this.addPodnaslov,
      kategorija: this.addKategorija,
      vsebina: this.addVsebina,
      image: this.addImage,
      datum_vnosa: new Date().toISOString() // Timestamp of when the blog post was last edited
    };

    // Retrieve the current blog ID from the route parameters
    const blogId = this._activatedRoute.snapshot.paramMap.get('id') || '';

    // Call the BlogService method to update the blog post with new data
    this._blogService.editBlogById(blogId, addNew).subscribe();

    // Navigate the user back to the blog admin page after editing is complete
    this._router.navigate([ '/blog-admin' ]);
  }

}
