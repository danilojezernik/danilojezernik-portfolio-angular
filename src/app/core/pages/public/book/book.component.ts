import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from "../../../../services/api/book.service";
import { BehaviorSubject, map, Observable, switchMap } from "rxjs";
import { Book } from "../../../../models/book";
import { SELECT_LANGUAGE } from "../../../../shared/global-const/global.const";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatOptionModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { FormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { LoadingComponent } from "../../../../shared/components/loading/loading.component";

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [ CommonModule, MatFormFieldModule, MatOptionModule, MatSelectModule, FormsModule, TranslateModule, LoadingComponent ],
  templateUrl: './book.component.html',
  styleUrls: [ './book.component.scss' ]
})
export class BookComponent {

  private _bookService = inject(BookService)

  private selectedTechnologySubject = new BehaviorSubject<string>('All languages')

  filteredBooks$: Observable<{ all: Book[], length: number }> = this.selectedTechnologySubject.pipe(
    switchMap(technology => {
      return this._bookService.getAllBooks().pipe(
        map(books => {
          const filteredBooks = technology === 'All languages' ? books : books.filter(book => book.tehnologija === technology)
          return {
            all: filteredBooks,
            length: filteredBooks.length
          }
        })
      )
    })
  )

  /**
   * Property to bind the selected technology in the template.
   * - This property is used to bind the selected technology in the template and update the BehaviorSubject.
   */
  selectedTechnology: string = 'All languages'

  /**
   * Method to update the selected language.
   * - When a new language is selected, it updates the value of the BehaviorSubject.
   * - This triggers the Observable stream to emit the new value.
   */
  setSelectedTechnology(technology: string): void {
    this.selectedTechnologySubject.next(technology)
  }


  protected readonly SELECT_LANGUAGE = SELECT_LANGUAGE;
}
