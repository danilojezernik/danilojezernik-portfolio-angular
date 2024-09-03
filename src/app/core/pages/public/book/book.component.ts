import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookService} from "../../../../services/api/book.service";
import {BehaviorSubject, catchError, map, Observable, of, switchMap} from "rxjs";
import {Book} from "../../../../models/book";
import {SELECT_TECHNOLOGY} from "../../../../shared/global-const/global.const";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {FormsModule} from "@angular/forms";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {LoadingComponent} from "../../../../shared/components/loading/loading.component";
import {DropdownSelectComponent} from "../../../../shared/components/dropdown-select/dropdown-select.component";
import {GetImageService} from "../../../../services/get-image/get-image.service";
import {HeroTitleComponent} from "../../../../shared/components/hero-title/hero-title.component";
import {ShorteningTextPipe} from "../../../../pipes/shortening-text/shortening-text.pipe";
import {RouterLink} from "@angular/router";
import {OrderService} from "../../../../utils/local-storage/order-service";

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatOptionModule, MatSelectModule, FormsModule, TranslateModule, LoadingComponent, DropdownSelectComponent, HeroTitleComponent, ShorteningTextPipe, RouterLink],
  templateUrl: './book.component.html'
})
export class BookComponent {

  private _bookService = inject(BookService)
  private _translateService = inject(TranslateService)
  protected _getImageByName = inject(GetImageService)
  private _orderService = inject(OrderService)

// Property to store any error messages encountered during data fetching
  error: string | null = null

  // Subject to keep track of the selected technology for filtering books
  private selectedTechnologySubject = new BehaviorSubject<string>('selected.allTechnology')

  // Observable that emits filtered and ordered books based on the selected technology
  filteredBooks$: Observable<{ all: Book[], length: number }> = this.selectedTechnologySubject.pipe(
    // Switch to a new observable each time the selected technology changes
    switchMap(technology => {
      // Fetch all books from the BookService
      return this._bookService.getAllBooks().pipe(
        // Process the fetched books
        map(books => {
          // Filter books based on the selected technology
          const filteredBooks = technology === 'selected.allTechnology'
            ? books // If 'allTechnology' is selected, include all books
            : books.filter(book => book.tehnologija === technology) // Filter books by technology

          // Apply saved order to the filtered books using the OrderService
          const orderedBooks = this._orderService.applySavedOrder(filteredBooks, 'bookOrder', '_id')

          // Return the ordered books and their count
          return {
            all: orderedBooks,
            length: orderedBooks.length
          }
        }),
        // Handle any errors during the data fetching or processing
        catchError((error) => {
          // Extract the error message and translate it
          const message = error.message
          this._translateService.get(message).subscribe((translation) => {
            this.error = translation // Set the translated error message
          })
          // Return an observable with an empty array and length of 0
          return of({all: [], length: 0})
        })
      )
    })
  )

  /**
   * Property to bind the selected technology in the template.
   * - This property is used to bind the selected technology in the template and update the BehaviorSubject.
   */
  selectedTechnology: string = 'selected.allTechnology'

  /**
   * Method to update the selected language.
   * - When a new language is selected, it updates the value of the BehaviorSubject.
   * - This triggers the Observable stream to emit the new value.
   */
  setSelectedTechnology(technology: string): void {
    this.selectedTechnologySubject.next(technology)
  }

  /**
   * Method to handle change events from the dropdown.
   * - Casts the event target to HTMLSelectElement and updates the selected technology.
   */
  onSelectChange(technology: string): void {
    this.setSelectedTechnology(technology);
  }


  // Read-only property for the technology options, used in the template
  protected readonly SELECT_TECHNOLOGY = SELECT_TECHNOLOGY;
}
