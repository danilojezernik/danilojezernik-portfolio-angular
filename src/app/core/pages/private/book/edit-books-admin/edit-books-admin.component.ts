import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from "@angular/router";
import { BookService } from "../../../../../services/api/book.service";
import { catchError, map, of } from "rxjs";
import { Book } from "../../../../../models/book";
import { GoBackComponent } from "../../../../../shared/components/go-back/go-back.component";
import { ReusableFormEditComponent } from "../../../../../shared/forms/reusable-form-edit/reusable-form-edit.component";
import { formBooksConfig } from "../../../../../shared/global-const/form-config";
import { TranslateService } from "@ngx-translate/core";
import { LoadingComponent } from "../../../../../shared/components/loading/loading.component";

/**
 * @Component EditBooksAdminComponent
 * Represents the component responsible for editing a book post by ID in the admin interface.
 */

@Component({
  selector: 'app-edit-books-admin',
  standalone: true,
  imports: [ CommonModule, GoBackComponent, ReusableFormEditComponent, LoadingComponent ],
  templateUrl: './edit-books-admin.component.html'
})
export class EditBooksAdminComponent implements OnInit {

  // Private variables to inject services
  private _bookService = inject(BookService); // Service for book-related operations
  private _activatedRoute = inject(ActivatedRoute); // Provides access to route parameters
  private _router = inject(Router); // Helps navigate between routes
  private _translateService = inject(TranslateService); // Injecting TranslateService for translating error messages

  // Property to store error messages, initialized to null
  error: string | null = null;

  // Property to track loading state, initialized to false
  loading: boolean = false;

  // Object to hold the book data to be edited
  formData: any = {};

  /**
   * @method ngOnInit
   * Lifecycle hook that is called after Angular has initialized all data-bound properties.
   * Retrieves the book ID from the route parameters and fetches corresponding book data.
   */
  ngOnInit() {
    const bookId = this._activatedRoute.snapshot.paramMap.get('id') || '';

    // Show spinner while loading
    this.loading = true;

    // Fetch the book data using the BookService based on the retrieved ID
    this._bookService.getBookById(bookId).pipe(
      map(data => {
        this.formData = data; // Populate formData with fetched book data
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
        return of([] as Book[]);
      })
    ).subscribe();
  }

  /**
   * @method editBook
   * Updates an existing book with new data and navigates to the admin book page upon success.
   *
   * @param formValue - The form data submitted by the user.
   */
  editBook(formValue: Book) {
    // Show spinner while loading
    this.loading = true;

    const bookId = this._activatedRoute.snapshot.paramMap.get('id') || '';

    // Call the BookService method to update the book post with new data
    this._bookService.editBookById(bookId, formValue).subscribe(() => {
      // Hide spinner after loading
      this.loading = false;

      // Navigate the user back to the books admin page after editing is complete
      this._router.navigate([ '/books-admin' ]);
    }, (error) => {
      console.log('Error editing book: ', error);
      // Hide spinner after loading
      this.loading = false;
    });
  }

  /**
   * Form configuration for books
   * Uses predefined formBooksConfig from a global constant file
   */
  protected readonly formBooksConfig = formBooksConfig;
}
