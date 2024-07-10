import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, delay, Observable, retryWhen, scan, throwError } from 'rxjs';
import { MatSnackBar } from "@angular/material/snack-bar";

/**
 * HttpErrorInterceptor is an Angular HTTP interceptor that intercepts HTTP requests
 * and responses to handle errors globally. It retries failed requests based on
 * specific conditions and displays error messages using MatSnackBar.
 */

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar) {
  }

  /**
   * Intercepts HTTP requests and responses.
   * @param request The outgoing HTTP request.
   * @param next The next interceptor in the chain.
   * @returns An Observable of the HTTP event.
   */
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      // Retry the request when specific errors are encountered
      retryWhen(errors =>
        errors.pipe(
          /**
           * Use scan to keep track of retry count and determine when to stop retrying.
           * @param retryCount The current retry count.
           * @param error The current error.
           * @returns The updated retry count.
           */
          scan((retryCount, error) => {
            // Stop retrying after 3 attempts or if the error is not retryable
            if (retryCount >= 3 || !this.shouldRetry(error)) {
              throw error;
            }
            // Increment the retry count
            return retryCount + 1;
          }, 0),
          // Add a delay between retries to give transient issues time to resolve
          delay(1000)
        )
      ),
      // Catch and handle errors after retry attempts
      catchError((error: HttpErrorResponse) => {

        // Default error message
        let errorMessage = 'An unknown error occurred!';

        // Customize the error message based on the HTTP status code
        if (error.status === 0) {
          errorMessage = 'Check your network connection or try again later.';
        } else if (error.status === 400) {
          errorMessage = 'Bad Request. Please check your input.';
        } else if (error.status === 403) {
          errorMessage = 'You do not have permission to perform this action.';
        } else if (error.status === 401) {
          errorMessage = 'Unauthorized. Please check your username and password.';
        } else if (error.status === 404) {
          errorMessage = 'Resource not found.';
        } else if (error.status === 422) {
          errorMessage = 'Unprocessable Entity. Please check your input and try again.';
        } else if (error.status === 500) {
          errorMessage = 'An internal server error occurred. Please try again later.';
        }

        // Display the error message to the user using MatSnackBar
        this.snackBar.open(errorMessage, 'Close', {
          duration: 3000,
        });
        // Throw the error so it can be handled by other parts of the application if necessary
        return throwError(() => new Error(errorMessage));
      })
    )
  }

  /**
   * Determines if the request should be retried based on the error status code.
   * @param error The HTTP error response.
   * @returns Whether the request should be retried.
   */
  private shouldRetry(error: HttpErrorResponse): boolean {
    // Retry on network errors (status 0) and server errors (status 500-599)
    return error.status === 0 || (error.status >= 500 && error.status < 600)
  }
}
