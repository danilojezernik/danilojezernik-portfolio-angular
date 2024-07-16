import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Subscriber } from "../../models/subscriber";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SubscribeService {

  private _http = inject(HttpClient)

  /**
   * PUBLIC SERVICES
   */
  getAllSubscribers(): Observable<Subscriber[]> {
    return this._http.get<Subscriber[]>(`${environment.subscriberUrl.public}`)
  }

  getSubscriberById(id: string): Observable<Subscriber> {
    return this._http.get<Subscriber>(`${environment.subscriberUrl.public}/${id}`)
  }

  /**
   * PRIVATE SERVICES
   */
  addSubscriber(newSubscriber: any): Observable<Subscriber> {
    return this._http.post<Subscriber>(`${environment.subscriberUrl.public}/`, newSubscriber)
  }

  editSubscriberById(id: string, newSubscriber: any): Observable<Subscriber> {
    return this._http.put<Subscriber>(`${environment.subscriberUrl.public}/${id}`, newSubscriber)
  }

  deleteSubscriberById(id: string): Observable<Subscriber> {
    return this._http.delete<Subscriber>(`${environment.subscriberUrl.public}/${id}`)
  }

}
