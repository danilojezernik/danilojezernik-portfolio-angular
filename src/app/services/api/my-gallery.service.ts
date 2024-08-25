import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MyGalleryService {

  private _http = inject(HttpClient)

  getAllImages(): Observable<{ images: string[] }> {
    return this._http.get<{ images: string[] }>(`${environment.mediaUrl.public}/images/`)
  }

  getImageByName(filename: string): Observable<Blob> {
    return this._http.get(`${environment.mediaUrl.public}`, { responseType: 'blob'})
  }

  uploadImage(file: File): Observable<any> {
    const formData = new FormData()
    formData.append('file', file, file.name)

    return this._http.post<any>(`${environment.mediaUrl.public}/`, formData)
  }

  deleteImageByName(filename: string): Observable<any> {
    return this._http.delete<any>(`${environment.mediaUrl.public}/${filename}`)
  }

}
