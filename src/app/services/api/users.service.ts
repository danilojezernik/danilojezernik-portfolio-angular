/**
 * UsersService
 *
 * This service provides methods to interact with the user-related endpoints of the API.
 * It uses HttpClient for HTTP operations, and ErrorHandleService to handle any errors
 * that occur during HTTP requests.
 *
 * API Functions for Frontend:
 * - getAllUsersPublic: Fetches all users from the public API endpoint.
 * - getUserByIdPublic: Fetches a user by ID from the public API endpoint.
 * - getAllUsersPrivate: Fetches all users from the admin API endpoint.
 * - getUserByIdAdmin: Fetches a user by ID from the admin API endpoint.
 * - editUserByIdAdmin: Updates a user by ID using the public API endpoint.
 * - addUserAdmin: Adds a new user using the public API endpoint.
 */

import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError, Observable } from "rxjs";
import { User } from "../../models/user";
import { environment } from "../../../environments/environment";
import { ErrorHandleService } from "../error-handle/error-handle.service";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private _http = inject(HttpClient)
  private _errorHandleService = inject(ErrorHandleService)

  /**
   * PUBLIC SERVICES
   */

  /**
   * Fetches all users from the public API endpoint.
   * @returns Observable<User[]> - An observable that emits an array of users.
   */
  getAllUsersPublic(): Observable<User[]> {
    return this._http.get<User[]>(`${environment.usersUrl.public}`).pipe(
      // Handling any errors that occur during the HTTP request
      catchError(this._errorHandleService.handleError)
    )
  }

  /**
   * Fetches a user by ID from the public API endpoint.
   * @param id - The ID of the user to fetch.
   * @returns Observable<User> - An observable that emits the user object.
   */
  getUserByIdPublic(id: string): Observable<User> {
    return this._http.get<User>(`${environment.usersUrl.public}/${id}`).pipe(
      // Handling any errors that occur during the HTTP request
      catchError(this._errorHandleService.handleError)
    )
  }

  /**
   * PRIVATE SERVICES
   */

  /**
   * Fetches all users from the admin API endpoint.
   * @returns Observable<User[]> - An observable that emits an array of users.
   */
  getAllUsersPrivate(): Observable<User[]> {
    return this._http.get<User[]>(`${environment.usersUrl.admin}`).pipe(
      // Handling any errors that occur during the HTTP request
      catchError(this._errorHandleService.handleError)
    )
  }

  /**
   * Fetches a user by ID from the admin API endpoint.
   * @param id - The ID of the user to fetch.
   * @returns Observable<User> - An observable that emits the user object.
   */
  getUserByIdAdmin(id: string): Observable<User> {
    return this._http.get<User>(`${environment.usersUrl.admin}${id}`).pipe(
      // Handling any errors that occur during the HTTP request
      catchError(this._errorHandleService.handleError)
    )
  }

  /**
   * Updates a user by ID using the public API endpoint.
   * @param id - The ID of the user to update.
   * @param newUser - The new user data to update.
   * @returns Observable<User> - An observable that emits the updated user object.
   */
  editUserByIdAdmin(id: string, newUser: User): Observable<User> {
    return this._http.put<User>(`${environment.usersUrl.public}/${id}`, newUser).pipe(
      // Handling any errors that occur during the HTTP request
      catchError(this._errorHandleService.handleError)
    )
  }

  /**
   * Adds a new user using the public API endpoint.
   * @param newUser - The new user data to add.
   * @returns Observable<User> - An observable that emits the added user object.
   */
  addUserAdmin(newUser: User): Observable<User> {
    return this._http.post<User>(`${environment.usersUrl.public}`, newUser).pipe(
      // Handling any errors that occur during the HTTP request
      catchError(this._errorHandleService.handleError)
    )
  }
}
