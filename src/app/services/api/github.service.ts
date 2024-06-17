import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map, Observable } from "rxjs";
import { environment } from "../../../environments/environment.development";
import { Repo } from "../../models/github.model";

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  _http = inject(HttpClient)

  // Method to fetch GitHub repositories from the backend API
  getGitHubRepo(): Observable<Repo[]> {

    // Make an HTTP GET request to the backend API endpoint that returns an object with a 'repos' array
    return this._http.get<{ repos: Repo[] }>(`${environment.githubUrl}`).pipe(
      // Use the 'map' operator to transform the response object into just the 'repos' array
      map(response => response.repos)
    )

  }

}
