import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Newsletter } from "../../models/newsletter";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class NewsletterService {

  private _http = inject(HttpClient)

  /**
   * PUBLIC SERVICES
   */
  getAllNewsletters(): Observable<Newsletter[]> {
    return this._http.get<Newsletter[]>(`${environment.newsletterUrl.public}`)
  }

  getNewsletterById(id: string): Observable<Newsletter> {
    return this._http.get<Newsletter>(`${environment.newsletterUrl.public}/${id}`)
  }

  /**
   * PRIVATE SERVICES
   */
  getAllNewslettersAdmin(): Observable<Newsletter[]> {
    return this._http.get<Newsletter[]>(`${environment.newsletterUrl.admin}`)
  }

  addNewsletter(newNewsletter: Newsletter): Observable<Newsletter> {
    return this._http.post<Newsletter>(`${environment.newsletterUrl.public}/`, newNewsletter)
  }

  deleteNewsletterById(id: string): Observable<Newsletter> {
    return this._http.delete<Newsletter>(`${environment.newsletterUrl.public}/${id}`)
  }

}
