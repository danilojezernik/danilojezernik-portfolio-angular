import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from "../../../../../services/api/book.service";
import { BehaviorSubject, Observable } from "rxjs";
import { Book } from "../../../../../models/book";
import { MatDialog } from "@angular/material/dialog";
import { ButtonAdminComponent } from "../../../../../shared/components/button-admin/button-admin.component";
import { GoBackComponent } from "../../../../../shared/components/go-back/go-back.component";
import { ShowDataComponent } from "../../../../../shared/components/show-data/show-data.component";
import { openDialogUtil } from "../../../../../utils/open-dialog.util";

@Component({
  selector: 'app-all-books-admin',
  standalone: true,
  imports: [ CommonModule, ButtonAdminComponent, GoBackComponent, ShowDataComponent ],
  templateUrl: './all-books-admin.component.html'
})
export class AllBooksAdminComponent {

  private _bookService = inject(BookService)
  private _dialog = inject(MatDialog)

  private bookSubject = new BehaviorSubject<Book[]>([])
  books$ = this.bookSubject.asObservable()
  bookById$!: Observable<Book>

  constructor() {
    this.getAllBooks()
  }

  getAllBooks() {
    this._bookService.getAllBooks().subscribe(books => {
      this.bookSubject.next(books)
    })
  }

  getBookById(id: string) {
    this.bookById$ = this._bookService.getBookById(id)
  }

  deleteBook(id?: string) {
    if (id) {
      this._bookService.deleteBookById(id).subscribe(() => {
        this.getAllBooks()
      })
    }
  }

  openDialog(id?: string) {
    if (id) {
      this.bookById$ = this._bookService.getBookById(id)
      openDialogUtil(this._dialog, id, this.getBookById.bind(this), this.bookById$, 'naslov', 'book')
    }
  }

}
