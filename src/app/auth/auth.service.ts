import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { LoggedInService } from "../communication/logged-in.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private loggedIn: LoggedInService) {
  }

  /**
   * Method to set the access token and update the login status.
   * @param token {string} - The access token to be set.
   */
  setAccessToken(token: string): void {
    localStorage.setItem('token', token);
    // Update login status to true
    this.loggedIn.isLoggedIn(true)
  }

  /**
   * Method to get the access token.
   * @returns {string} - The access token.
   */
  getAccessToken(): string {
    return localStorage.getItem('token') || ''
  }

  /**
   * Method to clear the access token and update the login status to false.
   */
  clear() {
    localStorage.clear();
    // Update login status to false
    this.loggedIn.isLoggedIn(false)
  }

  /**
   * Method to send a login request.
   * @param username {string} - The username.
   * @param password {string} - The password.
   * @returns Observable<any> - Observable of the HTTP response.
   */
  login(username: string, password: string) {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    return this.http.post<any>(`${environment.backUrl}/login`, formData);
  }

}
