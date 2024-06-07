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
   * Get emails that were sent to you
   * */
  getAllEmailsAdmin(): Observable<Contact[]> {
    return this._http.get<Contact[]>(`${environment.localUrl}contact`)
  }
}
