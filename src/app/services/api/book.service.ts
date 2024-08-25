import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Book} from "../../models/book";
import {environment} from "../../../environments/environment";

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

  /**
   * PUBLIC MEDIA SERVICE
   */
  getAllBookImages(): Observable<{ images: string[] }> {
    return this._http.get<{ images: string[] }>(`${environment.bookUrl.public}/images/`)
  }

  /**
   * PRIVATE MEDIA SERVICE
   */

  deleteBookImageByName(filename: string): Observable<any> {
    return this._http.delete<any>(`${environment.bookUrl.publicMedia}${filename}`)
  }

  uploadBookImage(file: File): Observable<any> {
    const formData = new FormData()
    formData.append('file', file, file.name)

    return this._http.post<any>(`${environment.bookUrl.publicMedia}`, formData)
  }
}
