import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private snackBar: MatSnackBar) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unknown error occurred!';
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
        } else if (error.status === 500) {
          errorMessage = 'An internal server error occurred. Please try again later.';
        }

        // Display error message to the user
        this.snackBar.open(errorMessage, 'Close', {
          duration: 3000,
        });
        // Throw the error so it can be handled by the component if necessary
        return throwError(errorMessage);
      })
    )
  }
}
