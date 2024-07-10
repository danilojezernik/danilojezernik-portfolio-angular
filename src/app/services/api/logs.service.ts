import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { Logging } from "../../models/logs";

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  private _http = inject(HttpClient)

  // PRIVATE LOGS SERVICE

  /**
   * Adds a new post.
   * @param newPrivateLog The new post to be added.
   * @returns An observable of the added post.
   */
  addNewPrivateLogAdmin(newPrivateLog: Logging): Observable<Logging> {
    // Using Angular HttpClient to make a POST request to the specified API endpoint
    return this._http.post<Logging>(`${environment.backLogUrl.private}`, newPrivateLog)
  }

  // PUBLIC LOGS SERVICE

  /**
   * Adds a new post.
   * @param newPublicLog The new post to be added.
   * @returns An observable of the added post.
   */
  addNewPublicLogAdmin(newPublicLog: Logging): Observable<Logging> {
    // Using Angular HttpClient to make a POST request to the specified API endpoint
    return this._http.post<Logging>(`${environment.backLogUrl.public}`, newPublicLog)
  }

  // BACKEND LOGS SERVICE

  /**
   * Calls index backend to add log to backend admin.
   * @returns An observable of the added post.
   */
  getBackendLogAdmin(path: string): Observable<any> {
    // Using Angular HttpClient to make a GET request to the correct API endpoint
    return this._http.get<any>(`${environment.backLogUrl}${path}`)
  }

}
