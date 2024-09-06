import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Email} from "../../models/email";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private _http = inject(HttpClient)

  sendEMail(userId: string, emailData: Email): Observable<Email> {
    return this._http.post<Email>(`${environment.usersUrl.public}/send-email/${userId}`, emailData)
  }

  sendEmailAdmin(user_to: string, emailData: Email): Observable<Email> {
    return this._http.post<Email>(`${environment.contactUrl.public}/email-to/?email_from=${user_to}`, emailData)
  }
}
