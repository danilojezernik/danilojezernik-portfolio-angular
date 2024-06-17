import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Projects } from "../../models/projects";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  _http = inject(HttpClient)

  getAllProjects(): Observable<Projects[]> {
    return this._http.get<Projects[]>(`${environment.projectsUrl.public}`)
  }

  getProjectById(projectIdid: string): Observable<Projects> {
    return this._http.get<Projects>(`${environment.projectsUrl.public}/${projectIdid}`)
  }

  getAllProjectsAdmin(): Observable<Projects[]> {
    return this._http.get<Projects[]>(`${environment.projectsUrl.admin}`)
  }


}
