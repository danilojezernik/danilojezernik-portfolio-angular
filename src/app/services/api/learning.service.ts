import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LearningModel} from "../../models/learning.model";

@Injectable({
  providedIn: 'root'
})
export class LearningService {

  private _learningPath: string = 'assets/json/learning.json';
  private _http = inject(HttpClient)

  getLearningData(): Observable<LearningModel[]> {
    return this._http.get<LearningModel[]>(this._learningPath)
  }
}
