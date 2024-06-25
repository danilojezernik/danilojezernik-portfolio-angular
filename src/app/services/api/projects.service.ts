import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError, Observable } from "rxjs";
import { Projects } from "../../models/projects";
import { environment } from "../../../environments/environment";
import { ErrorHandleService } from "../error-handle/error-handle.service";

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private _http = inject(HttpClient)
  private _errorHandleService = inject(ErrorHandleService)

  getAllProjects(): Observable<Projects[]> {
    return this._http.get<Projects[]>(`${environment.projectsUrl.public}`).pipe(
      // Handling any errors that occur during the HTTP request
      catchError(this._errorHandleService.handleError)
    )
  }

  getProjectById(projectIdid: string): Observable<Projects> {
    return this._http.get<Projects>(`${environment.projectsUrl.public}/${projectIdid}`).pipe(
      // Handling any errors that occur during the HTTP request
      catchError(this._errorHandleService.handleError)
    )
  }

  getAllProjectsAdmin(): Observable<Projects[]> {
    return this._http.get<Projects[]>(`${environment.projectsUrl.admin}`).pipe(
      // Handling any errors that occur during the HTTP request
      catchError(this._errorHandleService.handleError)
    )
  }

  addProjectAdmin(newProject: Projects): Observable<Projects> {
    return this._http.post<Projects>(`${environment.projectsUrl.admin}`, newProject).pipe(
      // Handling any errors that occur during the HTTP request
      catchError(this._errorHandleService.handleError)
    )
  }

  editProjectByIdAdmin(projectId: string, newProject: Projects): Observable<Projects> {
    return this._http.put<Projects>(`${environment.projectsUrl.public}/${projectId}`, newProject).pipe(
      // Handling any errors that occur during the HTTP request
      catchError(this._errorHandleService.handleError)
    )
  }

  deleteProjectByIdAdmin(id: string): Observable<Projects> {
    return this._http.delete<Projects>(`${environment.projectsUrl.public}/${id}`).pipe(
      // Handling any errors that occur during the HTTP request
      catchError(this._errorHandleService.handleError)
    )
  }


}
