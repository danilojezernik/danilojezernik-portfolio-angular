import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { SubscriberClient } from "../../models/subscriberClient";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SubscribeService {

  private _http = inject(HttpClient)

  /**
   * PUBLIC SERVICES
   */
  getAllSubscribers(): Observable<SubscriberClient[]> {
    return this._http.get<SubscriberClient[]>(`${environment.subscriberUrl.public}`)
  }

  getSubscriberById(id: string): Observable<SubscriberClient> {
    return this._http.get<SubscriberClient>(`${environment.subscriberUrl.public}/${id}`)
  }

  /**
   * PRIVATE SERVICES
   */
  addSubscriber(newSubscriber: any): Observable<SubscriberClient> {
    return this._http.post<SubscriberClient>(`${environment.subscriberUrl.public}/`, newSubscriber)
  }

  editSubscriberById(id: string, newSubscriber: any): Observable<SubscriberClient> {
    return this._http.put<SubscriberClient>(`${environment.subscriberUrl.public}/${id}`, newSubscriber)
  }

  deleteSubscriberById(id: string): Observable<SubscriberClient> {
    return this._http.delete<SubscriberClient>(`${environment.subscriberUrl.public}/${id}`)
  }

  /**
   * SUBSCRIBE OF A CLIENT
   */
  subscribeClient(newSubscriber: any): Observable<SubscriberClient> {
    return this._http.post<SubscriberClient>(`${environment.subscriberUrl.public}/subscribe/`, newSubscriber)
  }

}
