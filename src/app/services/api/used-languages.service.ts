import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UsedLanguagesService {

  private _http = inject(HttpClient)

  getLanguages(): Observable<{ tags: any }> {
    return this._http.get<{ tags: any }>(`${environment.languageUrl}`)
  }
}
