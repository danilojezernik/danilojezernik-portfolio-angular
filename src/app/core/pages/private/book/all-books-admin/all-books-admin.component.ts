import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from "../../../../../services/api/book.service";
import { BehaviorSubject, catchError, finalize, Observable, of } from "rxjs";
import { Book } from "../../../../../models/book";
import { MatDialog } from "@angular/material/dialog";
import { ButtonAdminComponent } from "../../../../../shared/components/button-admin/button-admin.component";
import { GoBackComponent } from "../../../../../shared/components/go-back/go-back.component";
import { ShowDataComponent } from "../../../../../shared/components/show-data/show-data.component";
import { openDialogUtil } from "../../../../../utils/open-dialog.util";
import { TranslateService } from "@ngx-translate/core";
import { LoadingComponent } from "../../../../../shared/components/loading/loading.component";

/**
 * @Component AllBooksAdminComponent
 * Represents the component responsible for managing all books in the admin interface.
 */

@Component({
  selector: 'app-all-books-admin',
  standalone: true,
  imports: [ CommonModule, ButtonAdminComponent, GoBackComponent, ShowDataComponent, LoadingComponent ],
  templateUrl: './all-books-admin.component.html'
})
export class AllBooksAdminComponent {

  // Injecting required services
  private _bookService = inject(BookService); // Service to handle book-related operations
  private _dialog = inject(MatDialog); // Service to handle dialogs
  private _translateService = inject(TranslateService); // Service for translation

  // Property to store error messages, initialized to null
  error: string | null = null;
  // Property to track loading state, initialized to false
  loading: boolean = false;

  // BehaviorSubject to store and manage the list of books
  private bookSubject = new BehaviorSubject<Book[]>([]);
  // Observable to expose the list of books
  books$ = this.bookSubject.asObservable();

  // Observable to store a single book fetched by ID
  bookById$!: Observable<Book>;

  // Constructor to initialize the component and fetch all books
  constructor() {
    this.getAllBooks();
  }

  /**
   * @method getAllBooks
   * Fetches all books using the BookService and updates the BehaviorSubject.
   * Also handles loading state and error messages.
   */
  getAllBooks() {
    this.loading = true; // Set loading state to true before making the API call
    this._bookService.getAllBooks().pipe(
      // Handle any errors that occur during the fetching process
      catchError((error) => {
        this.loading = false; // Set loading state to false if an error occurs
        // Extract and translate the error message, then set it to the error property
        const message = error.message;
        this._translateService.get(message).subscribe((translation) => {
          this.error = translation;
        });
        // Return an observable of an empty array to handle errors gracefully
        return of([] as Book[]);
      }),
      // Ensure loading state is set to false once the API call is complete
      finalize(() => this.loading = false)
    ).subscribe(books => {
      this.loading = false; // Set loading state to false after receiving the response
      this.bookSubject.next(books); // Update the BehaviorSubject with the fetched books
    });
  }

  /**
   * @method getBookById
   * Fetches a single book by its ID using the BookService.
   * @param id - The ID of the book to fetch.
   */
  getBookById(id: string) {
    this.bookById$ = this._bookService.getBookById(id);
  }

  /**
   * @method deleteBook
   * Deletes a book by its ID using the BookService and refreshes the list of books.
   * @param id - The ID of the book to delete.
   */
  deleteBook(id?: string) {
    if (id) {
      this._bookService.deleteBookById(id).subscribe(() => {
        this.getAllBooks(); // Refresh the list of books after deletion
      });
    }
  }

  /**
   * @method openDialog
   * Opens a dialog to view or edit a book by its ID.
   * @param id - The ID of the book to view or edit.
   */
  openDialog(id?: string) {
    if (id) {
      this.bookById$ = this._bookService.getBookById(id);
      openDialogUtil(this._dialog, id, this.getBookById.bind(this), this.bookById$, 'naslov', 'book');
    }
  }

}
