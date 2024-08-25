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

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatOptionModule, MatSelectModule, FormsModule, TranslateModule, LoadingComponent, DropdownSelectComponent],
  templateUrl: './book.component.html'
})
export class BookComponent {

  private _bookService = inject(BookService)
  private _translateService = inject(TranslateService)
  protected _getImageByName = inject(GetImageService)

  // Property to store error messages, initialized to null
  error: string | null = null

  private selectedTechnologySubject = new BehaviorSubject<string>('selected.allTechnology')

  filteredBooks$: Observable<{ all: Book[], length: number }> = this.selectedTechnologySubject.pipe(
    switchMap(technology => {
      return this._bookService.getAllBooks().pipe(
        map(books => {
          const filteredBooks = technology === 'selected.allTechnology' ? books : books.filter(book => book.tehnologija === technology)
          return {
            all: filteredBooks,
            length: filteredBooks.length
          }
        }),
        // 'catchError' is used to handle any errors that occur during the fetching process
        catchError((error) => {
          // Extract the error message
          const message = error.message
          // Translate the error message using the Translation service and set it to the error property
          this._translateService.get(message).subscribe((translation) => {
            this.error = translation
          })
          // Return an observable of an empty array and length of 0 to handle errors gracefully
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
