import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Angular} from "../../models/angular.model";

@Injectable({
  providedIn: 'root'
})
export class AngularService {

  private _http = inject(HttpClient)

  /**
   * PUBLIC SERVICES
   */
  getAllAngular(): Observable<Angular[]> {
    return this._http.get<Angular[]>(`${environment.angularUrl.public}`)
  }

  getAngularById(id: string): Observable<Angular> {
    return this._http.get<Angular>(`${environment.angularUrl.public}/${id}`)
  }

  /**
   * PRIVATE SERVICES
   */
  getAllAngularAdmin(): Observable<Angular[]> {
    return this._http.get<Angular[]>(`${environment.angularUrl.admin}`)
  }

  addAngular(newAngular: Angular): Observable<Angular> {
    return this._http.post<Angular>(`${environment.angularUrl.public}/`, newAngular)
  }

  editAngularById(id: string, newData: Angular) {
    console.log(newData)
    return this._http.put<Angular>(`${environment.angularUrl.public}/${id}`, newData)
  }

  deleteAngularById(id: string): Observable<Angular> {
    return this._http.delete<Angular>(`${environment.angularUrl.public}/${id}`)
  }

  /**
   * PUBLIC MEDIA SERVICE
   */
  getAllAngularImages(): Observable<{ images: string[] }> {
    return this._http.get<{ images: string[] }>(`${environment.angularUrl.public}/images/`)
  }

  /**
   * PRIVATE MEDIA SERVICE
   */
  deleteAngularImageByName(filename: string): Observable<string> {
    return this._http.delete<string>(`${environment.angularUrl.publicMedia}${filename}`)
  }

  uploadAngularImage(file: File): Observable<any> {
    const formData = new FormData()
    formData.append('file', file, file.name)

    return this._http.post<any>(`${environment.angularUrl.publicMedia}`, formData)
  }
}
