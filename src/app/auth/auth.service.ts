import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {environment} from '../../environments/environment';
import {LoggedInService} from '../services/communication/logged-in.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _http = inject(HttpClient);
  private _loggedIn = inject(LoggedInService);

  // BehaviorSubject to track and emit the current login status
  private loggedInSubject: BehaviorSubject<boolean>;

  // BehaviorSubject to track and emit the current role status

  constructor() {
    this.loggedInSubject = new BehaviorSubject<boolean>(this.hasToken());

    // Assigning the login status observable from the BehaviorSubject to the LoggedInService's observable
    this._loggedIn.isLoggedIn$ = this.loggedInSubject.asObservable();
  }

  setAccessToken(token: string): void {
    localStorage.setItem('token', token);

    // Update login status to true
    this.loggedInSubject.next(true);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }

  getAccessToken(): string {
    return localStorage.getItem('token') || '';
  }

  // New method to decode the role from the JWT token
  decodeRoleFromToken(): string {
    const token = this.getAccessToken();
    if (!token) {
      return '';
    }

    try {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.role || '';  // The role is encrypted in the token
    } catch (e) {
      console.error('Error decoding token:', e);
      return '';
    }
  }

  clear() {
    localStorage.clear();
    this.loggedInSubject.next(false);
  }

  login(username: string, password: string): Observable<any> {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    return this._http.post<any>(`${environment.authUrl}`, formData).pipe(
      tap(response => {
        if (response.access_token) {
          this.setAccessToken(response.access_token);
        }
      })
    );
  }
}
