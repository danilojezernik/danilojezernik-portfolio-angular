import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {environment} from "../../../../environments/environment.development";
import {Logging} from "../../models/logs";

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  constructor(private http: HttpClient) {
  }

  // PRIVATE LOGS SERVICE

  /**
   * Adds a new post.
   * @param newPrivateLog The new post to be added.
   * @returns An observable of the added post.
   */
  addNewPrivateLogAdmin(newPrivateLog: Logging): Observable<Logging> {
    // Using Angular HttpClient to make a POST request to the specified API endpoint
    return this.http.post<Logging>(`${environment.backLogUrl}/logs_hsa/private`, newPrivateLog).pipe(
      catchError(error => {
        // Log an error message if an error occurs during the API call
        console.error("Error adding a new post:", error);
        // Return a new observable with an error message if there's an error
        return throwError('Something went wrong')
      })
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
    return this.http.post<Logging>(`${environment.backLogUrl}/logs_hsa/public`, newPublicLog).pipe(
      catchError(error => {
        // Log an error message if an error occurs during the API call
        console.error("Error adding a new post:", error);
        // Return a new observable with an error message if there's an error
        return throwError('Something went wrong')
      })
    )
  }

  // BACKEND LOGS SERVICE

  /**
   * Calls index backend to add log to backend admin.
   * @returns An observable of the added post.
   */
  getBackendLogAdmin(path: string): Observable<any> {
    // Using Angular HttpClient to make a GET request to the correct API endpoint
    return this.http.get<any>(`${environment.backUrl}/${path}`).pipe(
      catchError(error => {
        // Log an error message if an error occurs during the API call
        console.error("Error fetching backend logs:", error);
        // Return a new observable with an error message if there's an error
        return throwError('Something went wrong');
      })
    );
  }

}
