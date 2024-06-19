import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandleService {

  /**
   * Handles HTTP errors.
   * @param error - The HTTP error response object.
   * @returns An observable that emits an error message.
   */
  handleError(error: HttpErrorResponse): Observable<never> {
    // Log the error to the console for debugging purposes
    console.error('HTTP error occurred:', error);

    // Initialize a default error message
    let errorMessage = 'An error occurred';

    // Check if the error is a network error (status 0)
    if (error.status === 0) {
      // Network error (e.g., no internet connection)
      errorMessage = 'Network error: Please check your internet connection or try again later.';
    } else {
      // Handle different HTTP status codes
      switch (error.status) {
        case 400:
          // Bad request error
          errorMessage += ': Bad request. Please check your inputs and try again.';
          break;
        case 403:
          // Forbidden error
          errorMessage += ': Permission denied. Please contact your administrator.';
          break;
        case 404:
          // Not found error
          errorMessage += ': Resource not found. Please try again later.';
          break;
        case 500:
          // Internal server error
          errorMessage += ': Internal server error. Please try again later.';
          break;
        default:
          // Other server-side error
          errorMessage += `: Server-side error - Status: ${error.status}, Message: ${error.message}`;
      }
    }

    // Return an observable with an error message
    return throwError(() => new Error(errorMessage));
  }
}
