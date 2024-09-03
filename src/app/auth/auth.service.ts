import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {environment} from '../../environments/environment';
import {LoggedInService} from '../services/communication/logged-in.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _http = inject(HttpClient);
  private _loggedIn = inject(LoggedInService);

  // BehaviorSubject to track and emit the current login status
  private loggedInSubject: BehaviorSubject<boolean>;

  // BehaviorSubject to track and emit the current role status
  private userRoleSubject: BehaviorSubject<string>

  constructor() {
    // Initializing the BehaviorSubject with the current login status based on the presence of a token
    this.loggedInSubject = new BehaviorSubject<boolean>(this.hasToken());

    // Initializing the BehaviorSubject with the current role status based on the presence of a role
    this.userRoleSubject = new BehaviorSubject<string>(this.getUserRole())

    // Assigning the login status observable from the BehaviorSubject to the LoggedInService's observable
    this._loggedIn.isLoggedIn$ = this.loggedInSubject.asObservable();
  }

  /**
   * Method to set the access token and update the login status.
   * @param token {string} - The access token to be set.
   * @param role
   */
  setAccessToken(token: string, role: string): void {
    // Store the token in localStorage
    sessionStorage.setItem('token', token);

    // Store role in local storage
    sessionStorage.setItem('role', role)

    // Update login status to true
    this.loggedInSubject.next(true);

    // Update role status to role
    this.userRoleSubject.next(role)
  }

  /**
   * Method to check if there is a token in localStorage.
   * @returns {boolean} - Whether the token exists.
   */
  private hasToken(): boolean {
    // Return true if a token exists in localStorage, false otherwise
    return !!sessionStorage.getItem('token');
  }

  /**
   * Method to get the access token.
   * @returns {string} - The access token.
   */
  getAccessToken(): string {
    // Retrieve the token from localStorage or return an empty string if it doesn't exist
    return sessionStorage.getItem('token') || '';
  }

  private getUserRole(): string {
    return sessionStorage.getItem('role') || ''
  }

  getUserRoleObservable(): Observable<string> {
    return this.userRoleSubject.asObservable()
  }

  /**
   * Method to clear the access token and update the login status to false.
   */
  clear() {
    // Clear all items from localStorage
    sessionStorage.clear();
    // Update login status to false
    this.loggedInSubject.next(false);
    this.userRoleSubject.next('')
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
    return this._http.post<any>(`${environment.authUrl}`, formData).pipe(
      tap(response => {
        if (response.access_token && response.role) {
          // Set the access token and user role from the response
          this.setAccessToken(response.access_token, response.role);
        }
      })
    );
  }
}
