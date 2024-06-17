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


  /**
   * PUBLIC SERVICES
   */

  getAllUsersPublic(): Observable<User[]> {
    return this._http.get<User[]>(`${environment.localUrl}user`)
  }

  getUSerByIdPublic(id: string): Observable<User> {
    return this._http.get<User>(`${environment.localUrl}user/${id}`)
  }


  /**
   * PRIVATE SERVICES
   */

  getAllUsersPrivate(): Observable<User[]> {
    return this._http.get<User[]>(`${environment.localUrl}user/private/`)
  }

  getUserByIdAdmin(id: string): Observable<User> {
    return this._http.get<User>(`${environment.localUrl}user/admin/${id}`)
  }

  editUserByIdAdmin(id: string, newUser: User): Observable<User> {
    return this._http.put<User>(`${environment.localUrl}user/${id}`, newUser)
  }
}
