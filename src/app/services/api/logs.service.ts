import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError, Observable } from "rxjs";
import { environment } from "../../../environments/environment";
import { Logging } from "../../models/logs";
import { ErrorHandleService } from "../error-handle/error-handle.service";

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  private _http = inject(HttpClient)
  private _errorHandleService = inject(ErrorHandleService)

  // PRIVATE LOGS SERVICE

  /**
   * Adds a new post.
   * @param newPrivateLog The new post to be added.
   * @returns An observable of the added post.
   */
  addNewPrivateLogAdmin(newPrivateLog: Logging): Observable<Logging> {
    // Using Angular HttpClient to make a POST request to the specified API endpoint
    return this._http.post<Logging>(`${environment.backLogUrl.private}`, newPrivateLog).pipe(
      // Handling any errors that occur during the HTTP request
      catchError(this._errorHandleService.handleError)
    )
  }

  // PUBLIC LOGS SERVICE

  /**
   * Adds a new post.
   * @param newPublicLog The new post to be added.
   * @returns An observable of the added post.
   */
  addNewPublicLogAdmin(newPublicLog: Logging): Observable<Logging> {
    // Using Angular HttpClient to make a POST request to the specified API endpoint
    return this._http.post<Logging>(`${environment.backLogUrl.public}`, newPublicLog).pipe(
      // Handling any errors that occur during the HTTP request
      catchError(this._errorHandleService.handleError)
    )
  }

  // BACKEND LOGS SERVICE

  /**
   * Calls index backend to add log to backend admin.
   * @returns An observable of the added post.
   */
  getBackendLogAdmin(path: string): Observable<any> {
    // Using Angular HttpClient to make a GET request to the correct API endpoint
    return this._http.get<any>(`${environment.backLogUrl}${path}`).pipe(
      // Handling any errors that occur during the HTTP request
      catchError(this._errorHandleService.handleError)
    );
  }

}
