import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Links } from "../../models/links";
import { environment } from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class LinksService {

  private _http = inject(HttpClient)

  /**
   * PUBLIC SERVICES
   */
  getAllLinks(): Observable<Links[]> {
    return this._http.get<Links[]>(`${environment.linksUrl.public}`)
  }

  getLinkById(id: string): Observable<Links> {
    return this._http.get<Links>(`${environment.linksUrl.public}/${id}`)
  }

  /**
   * PRIVATE SERVICES
   */
  getAllLinksAdmin(): Observable<Links[]> {
    return this._http.get<Links[]>(`${environment.linksUrl.admin}`)
  }


  addLink(newLink: Links): Observable<Links> {
    return this._http.post<Links>(`${environment.linksUrl.public}/`, newLink)
  }

  editLinkById(id: string, newLink: Links) {
    return this._http.put<Links>(`${environment.linksUrl.public}/${id}`, newLink)
  }

  deleteLinkById(id: string): Observable<Links> {
    return this._http.delete<Links>(`${environment.linksUrl.public}/${id}`)
  }
}
