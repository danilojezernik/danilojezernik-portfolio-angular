import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {TypeScript} from "../../models/typescript.model";

@Injectable({
  providedIn: 'root'
})
export class TypescriptService {

  private _http = inject(HttpClient)

  /**
   * PUBLIC SERVICES
   */
  getAllTypescript(): Observable<TypeScript[]> {
    return this._http.get<TypeScript[]>(`${environment.typescriptUrl.public}`)
  }

  getTypescriptById(id: string): Observable<TypeScript> {
    return this._http.get<TypeScript>(`${environment.typescriptUrl.public}/${id}`)
  }

  /**
   * PRIVATE SERVICES
   */
  getAllTypescriptAdmin(): Observable<TypeScript[]> {
    return this._http.get<TypeScript[]>(`${environment.typescriptUrl.admin}`)
  }

  addTypescript(newTypescript: TypeScript): Observable<TypeScript> {
    return this._http.post<TypeScript>(`${environment.typescriptUrl.public}/`, newTypescript)
  }

  editTypescriptById(id: string, newTypescript: TypeScript) {
    return this._http.put<TypeScript>(`${environment.typescriptUrl.public}/${id}`, newTypescript)
  }

  deleteTypescriptById(id: string): Observable<TypeScript> {
    return this._http.delete<TypeScript>(`${environment.typescriptUrl.public}/${id}`)
  }

  /**
   * PUBLIC MEDIA SERVICE
   */
  getAllTypescriptImages(): Observable<{ images: string[] }> {
    return this._http.get<{ images: string[] }>(`${environment.typescriptUrl.public}/images/`)
  }

  /**
   * PRIVATE MEDIA SERVICE
   */
  deleteTypescriptImageByName(filename: string): Observable<string> {
    return this._http.delete<string>(`${environment.typescriptUrl.publicMedia}${filename}`)
  }

  uploadTypescriptImage(file: File): Observable<any> {
    const formData = new FormData()
    formData.append('file', file, file.name)

    return this._http.post<any>(`${environment.typescriptUrl.publicMedia}`, formData)
  }

}
