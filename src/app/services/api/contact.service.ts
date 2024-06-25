import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError, Observable } from "rxjs";
import { Contact } from "../../models/contact";
import { environment } from "../../../environments/environment";
import { ErrorHandleService } from "../error-handle/error-handle.service";

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private _http = inject(HttpClient)
  private _errorHandleService = inject(ErrorHandleService)

  /**
   * Client sending emails to contact
   * */

  sendEmailContact(newEmail: Contact): Observable<Contact> {
    return this._http.post<Contact>(`${environment.contactUrl.public}`, newEmail).pipe(
      // Handling any errors that occur during the HTTP request
      catchError(this._errorHandleService.handleError)
    )
  }

  /**
   * Get emails that were sent to you
   * */
  getAllEmailsAdmin(): Observable<Contact[]> {
    return this._http.get<Contact[]>(`${environment.contactUrl.public}`).pipe(
      // Handling any errors that occur during the HTTP request
      catchError(this._errorHandleService.handleError)
    )
  }

  getEmailByIdAdmin(id: string): Observable<Contact> {
    return this._http.get<Contact>(`${environment.contactUrl.public}/${id}`).pipe(
      // Handling any errors that occur during the HTTP request
      catchError(this._errorHandleService.handleError)
    )
  }

  deleteEmailAdmin(id: string): Observable<Contact> {
    return this._http.delete<Contact>(`${environment.contactUrl.public}/${id}`).pipe(
      // Handling any errors that occur during the HTTP request
      catchError(this._errorHandleService.handleError)
    )
  }
}
