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
import { Observable } from "rxjs";
import { User } from "../../models/user";
import { environment } from "../../../environments/environment";
import {UserProfile} from "../../models/user-profile";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private _http = inject(HttpClient)

  /**
   * PUBLIC SERVICES
   */

  /**
   * Fetches all users from the public API endpoint.
   * @returns Observable<User[]> - An observable that emits an array of users.
   */
  getAllUsersPublic(): Observable<User[]> {
    return this._http.get<User[]>(`${environment.usersUrl.public}`)
  }

  /**
   * Fetches a user by ID from the public API endpoint.
   * @param id - The ID of the user to fetch.
   * @returns Observable<User> - An observable that emits the user object.
   */
  getUserByIdPublic(id: string): Observable<User> {
    return this._http.get<User>(`${environment.usersUrl.public}/${id}`)
  }

  /**
   * PRIVATE SERVICES
   */

  /**
   * Fetches all users from the admin API endpoint.
   * @returns Observable<User[]> - An observable that emits an array of users.
   */
  getAllUsersPrivate(): Observable<User[]> {
    return this._http.get<User[]>(`${environment.usersUrl.admin}`)
  }

  /**
   * Fetches a user by ID from the admin API endpoint.
   * @param id - The ID of the user to fetch.
   * @returns Observable<User> - An observable that emits the user object.
   */
  getUserByIdAdmin(id: string): Observable<User> {
    return this._http.get<User>(`${environment.usersUrl.admin}${id}`)
  }

  /**
   * Fetches a user by USERNAME from the admin API endpoint.
   * @returns Observable<User> - An observable that emits the user object.
   * @param username
   */
  getUserByUsernameAdmin(username: string): Observable<User> {
    return this._http.get<User>(`${environment.usersUrl.admin}${username}`)
  }

  /**
   * Updates a user by ID using the public API endpoint.
   * @param id - The ID of the user to update.
   * @param newUser - The new user data to update.
   * @returns Observable<User> - An observable that emits the updated user object.
   */
  editUserByIdAdmin(id: string, newUser: User): Observable<User> {
    return this._http.put<User>(`${environment.usersUrl.public}/${id}`, newUser)
  }

  /**
   * Adds a new user using the public API endpoint.
   * @param newUser - The new user data to add.
   * @returns Observable<User> - An observable that emits the added user object.
   */
  addUserAdmin(newUser: User): Observable<User> {
    console.log(newUser)
    return this._http.post<User>(`${environment.usersUrl.public}`, newUser)
  }

  deleteUserById(id: string): Observable<any> {
    return this._http.delete<any>(`${environment.usersUrl.public}/${id}`)
  }

  /**
   * Dashboard for user me
   * */

  /**
   * Fetch the current user's profile from the backend.
   *
   * @returns Observable<UserProfile> - An observable containing the user profile data.
   */
  getUserProfile(): Observable<any> {
    return this._http.get<any>(`${environment.usersUrl.public}/me/profile`);
  }

  /**
   * Update the current user's profile data.
   *
   * @param profileData - The updated profile data to be sent to the backend.
   * @returns Observable<UserProfile> - An observable containing the updated user profile.
   */
  updateUserProfile(profileData: any): Observable<any> {
    return this._http.put<any>(`${environment.usersUrl.public}/me/profile`, profileData);
  }

}
