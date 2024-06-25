import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError, map, Observable } from "rxjs";
import { environment } from "../../../environments/environment.development";
import { Repo } from "../../models/github.model";
import { ErrorHandleService } from "../error-handle/error-handle.service";

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  private _http = inject(HttpClient)
  private _errorHandleService = inject(ErrorHandleService)
  
  // Method to fetch GitHub repositories from the backend API
  getGitHubRepo(): Observable<Repo[]> {

    // Make an HTTP GET request to the backend API endpoint that returns an object with a 'repos' array
    return this._http.get<{ repos: Repo[] }>(`${environment.githubUrl}`).pipe(
      // Use the 'map' operator to transform the response object into just the 'repos' array
      map(response => response.repos),
      catchError(this._errorHandleService.handleError)
    )

  }

}
