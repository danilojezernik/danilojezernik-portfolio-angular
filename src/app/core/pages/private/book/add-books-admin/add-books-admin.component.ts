import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from "../../../../../services/api/book.service";
import { Router } from "@angular/router";
import { Book } from "../../../../../models/book";
import { formBlogConfig, formBooksConfig } from "../../../../../shared/global-const/form-config";
import { ReusableFormAddComponent } from "../../../../../shared/forms/reusable-form-add/reusable-form-add.component";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: 'app-add-books-admin',
  standalone: true,
  imports: [ CommonModule, ReusableFormAddComponent, TranslateModule ],
  templateUrl: './add-books-admin.component.html'
})
export class AddBooksAdminComponent {

  private _bookService = inject(BookService)
  private _router = inject(Router)

  addNewBook(formValidator: Book) {
    this._bookService.addBook(formValidator).subscribe(() => {
      this._router.navigate([ 'books-admin' ])
    })
  }

  protected readonly formBlogConfig = formBlogConfig;
  protected readonly formBooksConfig = formBooksConfig;
}
