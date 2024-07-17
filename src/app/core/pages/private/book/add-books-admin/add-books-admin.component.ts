import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from "../../../../../services/api/book.service";
import { Router } from "@angular/router";
import { Book } from "../../../../../models/book";
import { formBooksConfig } from "../../../../../shared/global-const/form-config";
import { ReusableFormAddComponent } from "../../../../../shared/forms/reusable-form-add/reusable-form-add.component";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { of } from "rxjs";
import { GoBackComponent } from "../../../../../shared/components/go-back/go-back.component";
import { LoadingComponent } from "../../../../../shared/components/loading/loading.component";

/**
 * @Component AddBooksAdminComponent
 * Represents the component responsible for adding new books in the admin interface.
 */

@Component({
  selector: 'app-add-books-admin',
  standalone: true,
  imports: [ CommonModule, ReusableFormAddComponent, TranslateModule, GoBackComponent, LoadingComponent ],
  templateUrl: './add-books-admin.component.html'
})
export class AddBooksAdminComponent {

  // Injected instances: BookService for managing book data, Router for navigation, TranslateService for translations
  private _bookService = inject(BookService); // Injecting BookService for book-related operations
  private _router = inject(Router); // Injecting Router for navigating between routes
  private _translateService = inject(TranslateService); // Injecting TranslateService for translating error messages

  // Property to store error messages, initialized to null
  error: string | null = null;

  // Property to track loading state, initialized to false
  loading: boolean = false;

  /**
   * @method addNewBook
   * Adds a new book and navigates to the admin books page upon success.
   *
   * @param formValidator - The form data submitted by the user.
   */
  addNewBook(formValidator: Book) {
    // Set loading state to true to show spinner
    this.loading = true;

    // Call the addBook method from the BookService
    this._bookService.addBook(formValidator).subscribe(() => {
      // Hide spinner after successful loading
      this.loading = false;

      // Navigate to the 'books-admin' route
      this._router.navigate([ 'books-admin' ]);
    }, (error) => {
      // Hide spinner after error occurs
      this.loading = false;

      // Extract the error message
      const message = error.message;
      // Translate the error message using the TranslateService and set it to the error property
      this._translateService.get(message).subscribe((translation) => {
        this.error = translation;
      });

      // Return an observable of an empty array to handle errors gracefully
      return of([] as Book[]);
    });
  }

  /**
   * Form configuration for books
   * Uses predefined formBooksConfig from a global constant file
   */
  protected readonly formBooksConfig = formBooksConfig;
}
