import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError, Observable } from "rxjs";
import { User } from "../../models/user";
import { environment } from "../../../environments/environment.development";
import { ErrorHandleService } from "../error-handle/error-handle.service";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private _http = inject(HttpClient)
  private _errorHandleService = inject(ErrorHandleService)

  registerNewUser(newUser: User): Observable<User> {
    return this._http.post<User>(`${environment.registerUrl}`, newUser).pipe(
      // Handling any errors that occur during the HTTP request
      catchError(this._errorHandleService.handleError)
    )
  }
}
