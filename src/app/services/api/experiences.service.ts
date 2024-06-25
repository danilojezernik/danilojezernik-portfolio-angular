import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError, Observable } from "rxjs";
import { Experiences } from "../../models/experiences";
import { environment } from "../../../environments/environment.development";
import { ErrorHandleService } from "../error-handle/error-handle.service";

@Injectable({
  providedIn: 'root'
})
export class ExperiencesService {

  private _http = inject(HttpClient)
  private _errorHandleService = inject(ErrorHandleService)

  /**
   * PUBLIC SERVICES
   */
  getAllExperiences(): Observable<Experiences[]> {
    return this._http.get<Experiences[]>(`${environment.experiencesUrl.public}`).pipe(
      // Handling any errors that occur during the HTTP request
      catchError(this._errorHandleService.handleError)
    )
  }

  getExperienceById(id: string): Observable<Experiences> {
    return this._http.get<Experiences>(`${environment.experiencesUrl.public}/${id}`).pipe(
      // Handling any errors that occur during the HTTP request
      catchError(this._errorHandleService.handleError)
    )
  }

  /**
   * PRIVATE SERVICES
   */
  getAllExperiencesAdmin(): Observable<Experiences[]> {
    return this._http.get<Experiences[]>(`${environment.experiencesUrl.admin}`).pipe(
      // Handling any errors that occur during the HTTP request
      catchError(this._errorHandleService.handleError)
    )
  }

}
