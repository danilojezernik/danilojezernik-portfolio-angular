import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../../models/user";
import { environment } from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private _http = inject(HttpClient)

  registerNewUser(newUser: User): Observable<User> {
    return this._http.post<User>(`${environment.registerUrl}`, newUser)
  }
}
