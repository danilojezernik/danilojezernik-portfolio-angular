import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogService } from "../../../../../services/api/blog.service";
import { ActivatedRoute, Router } from "@angular/router";
import { catchError, map, of } from "rxjs";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { GoBackComponent } from "../../../../../shared/components/go-back/go-back.component";
import { ReusableFormEditComponent } from "../../../../../shared/forms/reusable-form-edit/reusable-form-edit.component";
import { formBlogConfig } from "../../../../../shared/global-const/form-config";
import { BlogModel } from "../../../../../models/blog.model";
import { LoadingComponent } from "../../../../../shared/components/loading/loading.component";
import { TranslateService } from "@ngx-translate/core";

/**
 * @Component BlogEditByIdAdminComponent
 * Represents the component responsible for editing a blog post by ID in the admin interface.
 */

@Component({
  selector: 'app-blog-edit-by-id-admin',
  standalone: true,
  imports: [ CommonModule, ReactiveFormsModule, FormsModule, GoBackComponent, ReusableFormEditComponent, LoadingComponent ],
  templateUrl: './blog-edit-by-id-admin.component.html'
})
export class BlogEditByIdAdminComponent implements OnInit {

  // Private variables to inject services
  private _blogService = inject(BlogService); // Service for blog-related operations
  private _activatedRoute = inject(ActivatedRoute); // Provides access to route parameters
  private _router = inject(Router); // Helps navigate between routes
  private _translateService = inject(TranslateService)

  // Property to store error messages, initialized to null
  error: string | null = null
  loading: boolean = false

  formData: any = {}; // Object to hold the blog data to be edited

  /**
   * @method ngOnInit
   * Lifecycle hook that is called after Angular has initialized all data-bound properties.
   * Retrieves the blog ID from the route parameters and fetches corresponding blog data.
   */
  ngOnInit() {
    // Retrieve the blog ID from the route parameters
    const blogId = this._activatedRoute.snapshot.paramMap.get('id') || ''

    // Show spinner while loading
    this.loading = true

    // Fetch the blog data using the BlogService based on the retrieved ID
    this._blogService.getBlogById(blogId).pipe(
      map(data => {
        this.formData = data // Populate formData with fetched blog data
        this.loading = false // Hide spinner after loading
      }),
      catchError((error) => {
        this.loading = false // Hide spinner after loading
        // Extract the error message
        const message = error.message
        // Translate the error message using the Translation service and set it to the error property
        this._translateService.get(message).subscribe((translation) => {
          this.error = translation
        })
        // Return an observable of an empty array to handle errors gracefully
        return of([] as BlogModel[])
      })
    ).subscribe()
  }

  /**
   * @method editBlog
   * Updates an existing blog post with new data and navigates to the admin blog page upon success.
   *
   * @param formValue - The form data submitted by the user.
   */
  editBlog(formValue: BlogModel) {

    // Show spinner while loading
    this.loading = true

    // Retrieve the current blog ID from the route parameters
    const blogId = this._activatedRoute.snapshot.paramMap.get('id') || '';

    // Call the BlogService method to update the blog post with new data
    this._blogService.editBlogById(blogId, formValue).subscribe(() => {

      // Hide spinner after loading
      this.loading = false

      // Navigate the user back to the blog admin page after editing is complete
      this._router.navigate([ '/blog-admin' ]);
    }, (error) => {

      // Hide spinner after loading
      this.loading = false
      // Extract the error message
      const message = error.message
      // Translate the error message using the Translation service and set it to the error property
      this._translateService.get(message).subscribe((translation) => {
        this.error = translation
      })
      // Return an observable of an empty array to handle errors gracefully
      return of([] as BlogModel[])
    });
  }

  /**
   * Form configuration for blog
   * Uses predefined formBlogConfig from a global constant file
   * */
  protected readonly formBlogConfig = formBlogConfig;
}
