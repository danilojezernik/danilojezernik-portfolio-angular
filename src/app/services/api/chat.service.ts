import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private _http = inject(HttpClient)

  // Method to handle streaming JSON response using EventSource
  sendQuestion(question: string): Observable<any> {
    return this._http.post<any>(`${environment.chatUrl}`, { question: question });
  }

}
