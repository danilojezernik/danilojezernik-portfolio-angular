import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {JavaScript} from "../../models/javascript.model";

@Injectable({
  providedIn: 'root'
})
export class JavascriptService {

  private _http = inject(HttpClient)

  /**
   * PUBLIC SERVICES
   */
  getAllJavascript(): Observable<JavaScript[]> {
    return this._http.get<JavaScript[]>(`${environment.javascriptUrl.public}`)
  }

  getJavascriptById(id: string): Observable<JavaScript> {
    return this._http.get<JavaScript>(`${environment.javascriptUrl.public}/${id}`)
  }

  /**
   * PRIVATE SERVICES
   */
  getAllJavascriptAdmin(): Observable<JavaScript[]> {
    return this._http.get<JavaScript[]>(`${environment.javascriptUrl.admin}`)
  }

  addJavascript(newJavascript: JavaScript): Observable<JavaScript> {
    return this._http.post<JavaScript>(`${environment.javascriptUrl.public}/`, newJavascript)
  }

  editJavascriptById(id: string, newJavascript: JavaScript) {
    return this._http.put<JavaScript>(`${environment.javascriptUrl.public}/${id}`, newJavascript)
  }

  deleteJavascriptById(id: string): Observable<JavaScript> {
    return this._http.delete<JavaScript>(`${environment.javascriptUrl.public}/${id}`)
  }

  /**
   * PUBLIC MEDIA SERVICE
   */
  getAllJavascriptImages(): Observable<{ images: string[] }> {
    return this._http.get<{ images: string[] }>(`${environment.javascriptUrl.public}/images/`)
  }

  /**
   * PRIVATE MEDIA SERVICE
   */
  deleteJavascriptImageByName(filename: string): Observable<string> {
    return this._http.delete<string>(`${environment.javascriptUrl.publicMedia}${filename}`)
  }

  uploadJavascriptImage(file: File): Observable<any> {
    const formData = new FormData()
    formData.append('file', file, file.name)

    return this._http.post<any>(`${environment.javascriptUrl.publicMedia}`, formData)
  }

}
