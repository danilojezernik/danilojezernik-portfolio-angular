import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Links } from "../../models/links";
import { environment } from "../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class LinksService {

  private _http = inject(HttpClient)

  getAllLinks(): Observable<Links[]> {
    return this._http.get<Links[]>(`${environment.linksUrl.public}`)
  }
}
