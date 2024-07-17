import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { LinksService } from "../../../../../services/api/links.service";
import { catchError, map, of } from "rxjs";
import { Links } from "../../../../../models/links";
import { GoBackComponent } from "../../../../../shared/components/go-back/go-back.component";
import { LoadingComponent } from "../../../../../shared/components/loading/loading.component";
import { ReusableFormEditComponent } from "../../../../../shared/forms/reusable-form-edit/reusable-form-edit.component";
import { formLinksConfig } from "../../../../../shared/global-const/form-config";

@Component({
  selector: 'app-edit-links',
  standalone: true,
  imports: [ CommonModule, GoBackComponent, LoadingComponent, ReusableFormEditComponent ],
  templateUrl: './edit-links.component.html'
})
export class EditLinksComponent implements OnInit {

  // Injected instances: BlogService for managing blog data, ActivatedRoute for accessing route parameters, Router for navigation, TranslateService for translations
  private _linksService = inject(LinksService); // Injecting BlogService for blog-related operations
  private _activatedRoute = inject(ActivatedRoute); // Injecting ActivatedRoute for accessing route parameters
  private _router = inject(Router); // Injecting Router for navigating between routes
  private _translateService = inject(TranslateService); // Injecting TranslateService for translating error messages

  // Property to store error messages, initialized to null
  error: string | null = null;

  // Property to track loading state, initialized to false
  loading: boolean = false;

  // Object to hold the blog data to be edited, initialized to an empty object
  formData: any = {};

  /**
   * @method ngOnInit
   * Lifecycle hook that is called after Angular has initialized all data-bound properties.
   * Retrieves the blog ID from the route parameters and fetches corresponding blog data.
   */
  ngOnInit() {
    // Retrieve the link ID from the route parameters
    const linkId = this._activatedRoute.snapshot.paramMap.get('id') || '';

    // Show spinner while loading
    this.loading = true;

    // Fetch the link data using the BlogService based on the retrieved ID
    this._linksService.getLinkById(linkId).pipe(
      map(data => {
        this.formData = data; // Populate formData with fetched blog data
        this.loading = false; // Hide spinner after loading
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
        return of([] as Links[]);
      })
    ).subscribe();
  }

  /**
   * @method editLink
   * Method to edit a link based on form inputs.
   * Validates required fields and calls LinkService to edit the link.
   * Navigates back to the link admin page after successful edit.
   *
   * @param formValue - The form data to be validated and sent to the server for editing a link.
   */
  editLink(formValue: Links) {
    // Show spinner while loading
    this.loading = true;

    // Retrieve the current blog ID from the route parameters
    const linkId = this._activatedRoute.snapshot.paramMap.get('id') || '';

    // Call LinkService to edit the link
    this._linksService.editLinkById(linkId, formValue).subscribe(() => {
      // Hide spinner after loading
      this.loading = false;

      // Navigate to the link admin page after successful edit
      this._router.navigate([ 'links-admin' ]);
    }, (error) => {
      console.log('Error editing blog: ', error)
      // Hide spinner after loading
      this.loading = false;
    });
  }

  protected readonly formLinksConfig = formLinksConfig;
}
