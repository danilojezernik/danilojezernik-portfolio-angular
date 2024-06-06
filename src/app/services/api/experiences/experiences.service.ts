import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Experiences } from "../../../models/experiences";
import { environment } from "../../../../environments/environment.development";

@Injectable({
  providedIn: 'root'
})
export class ExperiencesService {

  _http = inject(HttpClient)


  getAllExperiences(): Observable<Experiences[]> {
    return this._http.get<Experiences[]>(`${environment.localUrl}experiences`)
  }
}
