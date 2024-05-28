import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  _http = inject(HttpClient)

  getGitHubRepo(): Observable<any> {
    return this._http.get<any>(`${environment.localUrl}github`)
  }
}
