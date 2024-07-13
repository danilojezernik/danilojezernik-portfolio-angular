import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Experiences } from "../../models/experiences";
import { environment } from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class ExperiencesService {

  private _http = inject(HttpClient)

  /**
   * PUBLIC SERVICES
   */
  getAllExperiences(): Observable<Experiences[]> {
    return this._http.get<Experiences[]>(`${environment.experiencesUrl.public}`)
  }

  getExperienceById(id: string): Observable<Experiences> {
    return this._http.get<Experiences>(`${environment.experiencesUrl.public}/${id}`)
  }

  /**
   * PRIVATE SERVICES
   */
  getAllExperiencesAdmin(): Observable<Experiences[]> {
    return this._http.get<Experiences[]>(`${environment.experiencesUrl.admin}`)
  }

  addExperience(newExperience: Experiences): Observable<Experiences> {
    return this._http.post<Experiences>(`${environment.experiencesUrl.public}/`, newExperience)
  }

  editExperienceById(id: string, newExperience: Experiences) {
    return this._http.put<Experiences>(`${environment.experiencesUrl.public}/${id}`, newExperience)
  }

  deleteExperienceById(id: string): Observable<Experiences> {
    return this._http.delete<Experiences>(`${environment.experiencesUrl.public}/${id}`)
  }
}
