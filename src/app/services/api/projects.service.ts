import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Projects } from "../../models/projects";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private _http = inject(HttpClient)

  getAllProjects(): Observable<Projects[]> {
    return this._http.get<Projects[]>(`${environment.projectsUrl.public}`)
  }

  getProjectById(projectIdid: string): Observable<Projects> {
    return this._http.get<Projects>(`${environment.projectsUrl.public}/${projectIdid}`)
  }

  getAllProjectsAdmin(): Observable<Projects[]> {
    return this._http.get<Projects[]>(`${environment.projectsUrl.admin}`)
  }

  addProjectAdmin(newProject: Projects): Observable<Projects> {
    return this._http.post<Projects>(`${environment.projectsUrl.admin}`, newProject)
  }

  editProjectByIdAdmin(projectId: string, newProject: Projects): Observable<Projects> {
    return this._http.put<Projects>(`${environment.projectsUrl.public}/${projectId}`, newProject)
  }

  deleteProjectByIdAdmin(id: string): Observable<Projects> {
    return this._http.delete<Projects>(`${environment.projectsUrl.public}/${id}`)
  }

  /**
   * PUBLIC MEDIA SERVICE
   */
  getAllProjectsImages(): Observable<{ images: string[] }> {
    return this._http.get<{ images: string[] }>(`${environment.projectsUrl.public}/images/`)
  }

  /**
   * PRIVATE MEDIA SERVICE
   */

  deleteProjectImageByName(filename: string): Observable<any> {
    return this._http.delete<any>(`${environment.projectsUrl.publicMedia}${filename}`)
  }

  uploadProjectImage(file: File): Observable<any> {
    const formData = new FormData()
    formData.append('file', file, file.name)

    return this._http.post<any>(`${environment.projectsUrl.publicMedia}`, formData)
  }

}
