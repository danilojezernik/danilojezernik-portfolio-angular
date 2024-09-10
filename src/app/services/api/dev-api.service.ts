import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {DevToArticle} from "../../models/dev-api";

@Injectable({
  providedIn: 'root'
})
export class DevApiService {

  private _http = inject(HttpClient)

  getArticlesDevAngular(): Observable<DevToArticle[]> {
    return this._http.get<DevToArticle[]>(`${environment.tech}angular`);
  }

  getArticlesDevVue(): Observable<DevToArticle[]> {
    return this._http.get<DevToArticle[]>(`${environment.tech}vue`);
  }

  getArticlesDevPython(): Observable<DevToArticle[]> {
    return this._http.get<DevToArticle[]>(`${environment.tech}python`);
  }

  getArticlesDevJavaScript(): Observable<DevToArticle[]> {
    return this._http.get<DevToArticle[]>(`${environment.tech}javascript`);
  }

  getArticlesDevTypeScript(): Observable<DevToArticle[]> {
    return this._http.get<DevToArticle[]>(`${environment.tech}typescript`);
  }

  getArticlesDevMongoDb(): Observable<DevToArticle[]> {
    return this._http.get<DevToArticle[]>(`${environment.tech}mongodb`);
  }

  getArticlesDevCss(): Observable<DevToArticle[]> {
    return this._http.get<DevToArticle[]>(`${environment.tech}css`);
  }

  getArticlesDevFrontend(): Observable<DevToArticle[]> {
    return this._http.get<DevToArticle[]>(`${environment.tech}frontend`);
  }

  getArticlesDevBackend(): Observable<DevToArticle[]> {
    return this._http.get<DevToArticle[]>(`${environment.tech}backend`);
  }

  getArticlesDevAi(): Observable<DevToArticle[]> {
    return this._http.get<DevToArticle[]>(`${environment.tech}ai`);
  }

  getArticlesDevGitHub(): Observable<DevToArticle[]> {
    return this._http.get<DevToArticle[]>(`${environment.tech}github`);
  }

  getArticlesDevSql(): Observable<DevToArticle[]> {
    return this._http.get<DevToArticle[]>(`${environment.tech}sql`);
  }

  getArticlesDevCypress(): Observable<DevToArticle[]> {
    return this._http.get<DevToArticle[]>(`${environment.tech}cypress`);
  }

  getArticlesDevAlgorithms(): Observable<DevToArticle[]> {
    return this._http.get<DevToArticle[]>(`${environment.tech}algorithms`);
  }
}
