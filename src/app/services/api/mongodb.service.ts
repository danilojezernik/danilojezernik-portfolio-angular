import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {MongoDb} from "../../models/mongodb.model";

@Injectable({
  providedIn: 'root'
})
export class MongodbService {

  private _http = inject(HttpClient)

  /**
   * PUBLIC SERVICES
   */
  getAllMongoDb(): Observable<MongoDb[]> {
    return this._http.get<MongoDb[]>(`${environment.mongodbUrl.public}`)
  }

  getMongoDbById(id: string): Observable<MongoDb> {
    return this._http.get<MongoDb>(`${environment.mongodbUrl.public}/${id}`)
  }

  /**
   * PRIVATE SERVICES
   */
  getAllMongoDbAdmin(): Observable<MongoDb[]> {
    return this._http.get<MongoDb[]>(`${environment.mongodbUrl.admin}`)
  }

  addMongoDb(newMongoDb: MongoDb): Observable<MongoDb> {
    return this._http.post<MongoDb>(`${environment.mongodbUrl.public}/`, newMongoDb)
  }

  editMongoDbById(id: string, newMongoDb: MongoDb) {
    return this._http.put<MongoDb>(`${environment.mongodbUrl.public}/${id}`, newMongoDb)
  }

  deleteMongoDbById(id: string): Observable<MongoDb> {
    return this._http.delete<MongoDb>(`${environment.mongodbUrl.public}/${id}`)
  }

  /**
   * PUBLIC MEDIA SERVICE
   */
  getAllMongoDbImages(): Observable<{ images: string[] }> {
    return this._http.get<{ images: string[] }>(`${environment.mongodbUrl.public}/images/`)
  }

  /**
   * PRIVATE MEDIA SERVICE
   */
  deleteMongoDbImageByName(filename: string): Observable<string> {
    return this._http.delete<string>(`${environment.mongodbUrl.publicMedia}${filename}`)
  }

  uploadMongoDbImage(file: File): Observable<any> {
    const formData = new FormData()
    formData.append('file', file, file.name)

    return this._http.post<any>(`${environment.mongodbUrl.publicMedia}`, formData)
  }

}
