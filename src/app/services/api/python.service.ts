import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {Python} from "../../models/python.mondel";

@Injectable({
  providedIn: 'root'
})
export class PythonService {

  private _http = inject(HttpClient)

  /**
   * PUBLIC SERVICES
   */
  getAllPython(): Observable<Python[]> {
    return this._http.get<Python[]>(`${environment.pythonUrl.public}`)
  }

  getPythonById(id: string): Observable<Python> {
    return this._http.get<Python>(`${environment.pythonUrl.public}/${id}`)
  }

  /**
   * PRIVATE SERVICES
   */
  getAllPythonAdmin(): Observable<Python[]> {
    return this._http.get<Python[]>(`${environment.pythonUrl.admin}`)
  }

  addPython(newPython: Python): Observable<Python> {
    return this._http.post<Python>(`${environment.pythonUrl.public}/`, newPython)
  }

  editPythonById(id: string, newPython: Python) {
    return this._http.put<Python>(`${environment.pythonUrl.public}/${id}`, newPython)
  }

  deletePythonById(id: string): Observable<Python> {
    return this._http.delete<Python>(`${environment.pythonUrl.public}/${id}`)
  }

  /**
   * PUBLIC MEDIA SERVICE
   */
  getAllPythonImages(): Observable<{ images: string[] }> {
    return this._http.get<{ images: string[] }>(`${environment.pythonUrl.public}/images/`)
  }

  /**
   * PRIVATE MEDIA SERVICE
   */
  deletePythonImageByName(filename: string): Observable<string> {
    return this._http.delete<string>(`${environment.pythonUrl.publicMedia}${filename}`)
  }

  uploadPythonImage(file: File): Observable<any> {
    const formData = new FormData()
    formData.append('file', file, file.name)

    return this._http.post<any>(`${environment.pythonUrl.publicMedia}`, formData)
  }

}
