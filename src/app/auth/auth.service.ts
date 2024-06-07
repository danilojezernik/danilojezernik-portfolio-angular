import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment.prod';
import { LoggedInService } from '../services/communication/logged-in.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _http = inject(HttpClient);
  private _loggedIn = inject(LoggedInService);

  // BehaviorSubject to track and emit the current login status
  private loggedInSubject: BehaviorSubject<boolean>;

  constructor() {
    // Initializing the BehaviorSubject with the current login status based on the presence of a token
    this.loggedInSubject = new BehaviorSubject<boolean>(this.hasToken());

    // Assigning the login status observable from the BehaviorSubject to the LoggedInService's observable
    this._loggedIn.isLoggedIn$ = this.loggedInSubject.asObservable();
  }

  /**
   * Method to set the access token and update the login status.
   * @param token {string} - The access token to be set.
   */
  setAccessToken(token: string): void {
    // Store the token in localStorage
    localStorage.setItem('token', token);
    // Update login status to true
    this.loggedInSubject.next(true);
  }

  /**
   * Method to check if there is a token in localStorage.
   * @returns {boolean} - Whether the token exists.
   */
  private hasToken(): boolean {
    // Return true if a token exists in localStorage, false otherwise
    return !!localStorage.getItem('token');
  }

  /**
   * Method to get the access token.
   * @returns {string} - The access token.
   */
  getAccessToken(): string {
    // Retrieve the token from localStorage or return an empty string if it doesn't exist
    return localStorage.getItem('token') || '';
  }

  /**
   * Method to clear the access token and update the login status to false.
   */
  clear() {
    // Clear all items from localStorage
    localStorage.clear();
    // Update login status to false
    this.loggedInSubject.next(false);
  }

  /**
   * Method to send a login request.
   * @param username {string} - The username.
   * @param password {string} - The password.
   * @returns Observable<any> - Observable of the HTTP response.
   */
  login(username: string, password: string): Observable<any> {
    // Create a FormData object to hold the login credentials
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    // Send a POST request to the login endpoint with the form data
    return this._http.post<any>(`${environment.localUrl}/login`, formData);
  }
}
