import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError, Observable } from "rxjs";
import { Links } from "../../models/links";
import { environment } from "../../../environments/environment.development";
import { ErrorHandleService } from "../error-handle/error-handle.service";

@Injectable({
  providedIn: 'root'
})
export class LinksService {

  private _http = inject(HttpClient)
  private _errorHandleService = inject(ErrorHandleService)

  getAllLinks(): Observable<Links[]> {
    return this._http.get<Links[]>(`${environment.linksUrl.public}`).pipe(
      // Handling any errors that occur during the HTTP request
      catchError(this._errorHandleService.handleError)
    )
  }
}
