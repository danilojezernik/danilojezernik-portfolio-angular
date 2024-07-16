import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from "@angular/router";
import { BookService } from "../../../../../services/api/book.service";
import { map } from "rxjs";
import { Book } from "../../../../../models/book";
import { GoBackComponent } from "../../../../../shared/components/go-back/go-back.component";
import { ReusableFormEditComponent } from "../../../../../shared/forms/reusable-form-edit/reusable-form-edit.component";
import { formBooksConfig } from "../../../../../shared/global-const/form-config";

/**
 * @Component EditBooksAdminComponent
 * Represents the component responsible for editing a book post by ID in the admin interface.
 */

@Component({
  selector: 'app-edit-books-admin',
  standalone: true,
  imports: [ CommonModule, GoBackComponent, ReusableFormEditComponent ],
  templateUrl: './edit-books-admin.component.html'
})
export class EditBooksAdminComponent implements OnInit {

  // Private variables to inject services
  private _bookService = inject(BookService); // Service for blog-related operations
  private _activatedRoute = inject(ActivatedRoute); // Provides access to route parameters
  private _router = inject(Router); // Helps navigate between routes

  formData: any = {}; // Object to hold the books data to be edited

  /**
   * @method ngOnInit
   * Lifecycle hook that is called after Angular has initialized all data-bound properties.
   * Retrieves the book ID from the route parameters and fetches corresponding books data.
   */

  ngOnInit() {
    const bookId = this._activatedRoute.snapshot.paramMap.get('id') || '';

    this._bookService.getBookById(bookId).pipe(
      map(data => {
        this.formData = data; // Populate formData with fetched book data
      })
    ).subscribe()
  }

  /**
   * @method editBook
   * Updates an existing book with new data and navigates to the admin book page upon success.
   *
   * @param formValue - The form data submitted by the user.
   */
  editBook(formValue: Book) {
    const bookId = this._activatedRoute.snapshot.paramMap.get('id') || '';

    this._bookService.editBookById(bookId, formValue).subscribe(() => {
      this._router.navigate([ '/books-admin' ]);
    })
  }

  /**
   * Form configuration for books
   * Uses predefined formBooksConfig from a global constant file
   * */
  protected readonly formBooksConfig = formBooksConfig;
}
