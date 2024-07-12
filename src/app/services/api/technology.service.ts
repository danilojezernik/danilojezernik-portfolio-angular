import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { Technology } from "../../models/technology";

@Injectable({
  providedIn: 'root'
})
export class TechnologyService {


  private _http = inject(HttpClient)

  /**
   * PUBLIC SERVICES
   */
  getAllTechnology(): Observable<Technology[]> {
    return this._http.get<Technology[]>(`${environment.technologyUrl.public}`)
  }

  getTechnologyById(id: string): Observable<Technology> {
    return this._http.get<Technology>(`${environment.technologyUrl.public}/${id}`)
  }

  /**
   * PRIVATE SERVICES
   */
  getAllTechnologyAdmin(): Observable<Technology[]> {
    return this._http.get<Technology[]>(`${environment.technologyUrl.admin}`)
  }

  addTechnology(newTechnology: Technology): Observable<Technology> {
    return this._http.post<Technology>(`${environment.technologyUrl.public}/`, newTechnology)
  }

  editTechnologyById(id: string, newData: Technology) {
    return this._http.put<Technology>(`${environment.technologyUrl.public}/${id}`, newData)
  }

  deleteTechnologyById(id: string): Observable<Technology> {
    return this._http.delete<Technology>(`${environment.technologyUrl.public}/${id}`)
  }

}
