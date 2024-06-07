import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../../models/user";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  _http = inject(HttpClient)

  getAllUsers(): Observable<User[]> {
    return this._http.get<User[]>(`${environment.localUrl}user`)
  }

  getAllUsersPrivate(): Observable<User[]> {
    return this._http.get<User[]>(`${environment.localUrl}user/private/`)
  }
}
