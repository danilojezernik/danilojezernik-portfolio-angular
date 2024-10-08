import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {LanguageData} from "../../models/language-data";

@Injectable({
  providedIn: 'root'
})
export class UsedLanguagesService {

  private _http = inject(HttpClient)

  getLanguagesAdmin(): Observable<LanguageData[]> {
    return this._http.get<LanguageData[]>(`${environment.languageUrl}`)
  }

  getLanguagesData(): Observable<LanguageData[]> {
    return this._http.get<LanguageData[]>(`${environment.languageUrl}/tags`)
  }

  // General method to fetch data by endpoint
  getDataByEndpoint(endpoint: string): Observable<LanguageData[]> {
    return this._http.get<LanguageData[]>(`${environment.languageUrl}/${endpoint}`);
  }

}
