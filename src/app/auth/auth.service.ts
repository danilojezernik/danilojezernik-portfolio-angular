import {Inject, inject, Injectable, PLATFORM_ID} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {environment} from '../../environments/environment';
import {LoggedInService} from '../services/communication/logged-in.service';
import { jwtDecode } from 'jwt-decode';
import {isPlatformBrowser} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _http = inject(HttpClient);
  private _loggedIn = inject(LoggedInService);

  // BehaviorSubject to track and emit the current login status
  private loggedInSubject: BehaviorSubject<boolean>;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {
    this.isBrowser = isPlatformBrowser(this.platformId); // Check if running in browser
    this.loggedInSubject = new BehaviorSubject<boolean>(this.hasToken());

    // Assign login status observable to LoggedInService's observable
    this._loggedIn.isLoggedIn$ = this.loggedInSubject.asObservable();
  }

  setAccessToken(token: string): void {
    if (this.isBrowser) {
      localStorage.setItem('token', token);
      this.loggedInSubject.next(true); // Update login status to true
    }
  }

  private hasToken(): boolean {
    if (!this.isBrowser) {
      return false; // No token in SSR context
    }
    return !!localStorage.getItem('token');
  }

  getAccessToken(): string {
    if (!this.isBrowser) {
      return ''; // No token in SSR context
    }
    return localStorage.getItem('token') || '';
  }

  decodeRoleFromToken(): string {
    const token = this.getAccessToken();
    if (!token) {
      return '';
    }

    try {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.role || ''; // Extract role from token
    } catch (e) {
      console.error('Error decoding token:', e);
      return '';
    }
  }

  clear(): void {
    if (this.isBrowser) {
      localStorage.removeItem('token');
      this.loggedInSubject.next(false); // Update login status to false
    }
  }

  login(username: string, password: string): Observable<any> {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    return this._http.post<any>(`${environment.authUrl}`, formData).pipe(
      tap((response) => {
        if (response.access_token) {
          this.setAccessToken(response.access_token);
        }
      })
    );
  }
}
