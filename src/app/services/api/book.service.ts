import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Book } from "../../models/book";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private _http = inject(HttpClient)

  /**
   * PUBLIC SERVICES
   */
  getAllBooks(): Observable<Book[]> {
    return this._http.get<Book[]>(`${environment.bookUrl.public}`)
  }

  getBookById(id: string): Observable<Book> {
    return this._http.get<Book>(`${environment.bookUrl.public}/${id}`)
  }

  /**
   * PRIVATE SERVICES
   */
  getAllBooksAdmin(): Observable<Book[]> {
    return this._http.get<Book[]>(`${environment.bookUrl.admin}`)
  }

  addBook(newBook: Book): Observable<Book> {
    return this._http.post<Book>(`${environment.bookUrl.public}/`, newBook)
  }

  editBookById(id: string, newBook: Book) {
    return this._http.put<Book>(`${environment.bookUrl.public}/${id}`, newBook)
  }

  deleteBookById(id: string): Observable<Book> {
    return this._http.delete<Book>(`${environment.bookUrl.public}/${id}`)
  }
}
