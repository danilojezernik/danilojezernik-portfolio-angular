import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Contact } from "../../models/contact";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  _http = inject(HttpClient)


  /**
   * Client sending emails to contact
   * */

  sendEmailContact(newEmail: Contact): Observable<Contact> {
    return this._http.post<Contact>(`${environment.contactUrl.public}`, newEmail)
  }


  /**
   * Get emails that were sent to you
   * */
  getAllEmailsAdmin(): Observable<Contact[]> {
    return this._http.get<Contact[]>(`${environment.contactUrl.public}`)
  }

  getEmailByIdAdmin(id: string): Observable<Contact> {
    return this._http.get<Contact>(`${environment.contactUrl.public}/${id}`)
  }
}
