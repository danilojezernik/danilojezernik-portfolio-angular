import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Vue} from "../../models/vue.model";

@Injectable({
  providedIn: 'root'
})
export class VueService {

  private _http = inject(HttpClient)

  /**
   * PUBLIC SERVICES
   */
  getAllVue(): Observable<Vue[]> {
    return this._http.get<Vue[]>(`${environment.vueUrl.public}`)
  }

  getVueById(id: string): Observable<Vue> {
    return this._http.get<Vue>(`${environment.vueUrl.public}/${id}`)
  }

  /**
   * PRIVATE SERVICES
   */
  getAllVueAdmin(): Observable<Vue[]> {
    return this._http.get<Vue[]>(`${environment.vueUrl.admin}`)
  }

  addVue(newVue: Vue): Observable<Vue> {
    return this._http.post<Vue>(`${environment.vueUrl.public}/`, newVue)
  }

  editVueById(id: string, newVue: Vue) {
    return this._http.put<Vue>(`${environment.vueUrl.public}/${id}`, newVue)
  }

  deleteVueById(id: string): Observable<Vue> {
    return this._http.delete<Vue>(`${environment.vueUrl.public}/${id}`)
  }

  /**
   * PUBLIC MEDIA SERVICE
   */
  getAllVueImages(): Observable<{ images: string[] }> {
    return this._http.get<{ images: string[] }>(`${environment.vueUrl.public}/images/`)
  }

  /**
   * PRIVATE MEDIA SERVICE
   */
  deleteVueImageByName(filename: string): Observable<string> {
    return this._http.delete<string>(`${environment.vueUrl.publicMedia}${filename}`)
  }

  uploadVueImage(file: File): Observable<any> {
    const formData = new FormData()
    formData.append('file', file, file.name)

    return this._http.post<any>(`${environment.vueUrl.publicMedia}`, formData)
  }

}
