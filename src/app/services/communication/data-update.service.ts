import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataUpdateService {

  // Creating a Subject to handle data updates. The Subject allows for emitting events to multiple subscribers.
  private dataUpdated = new Subject<void>();

  // Creating an observable to allow components to subscribe to data update events.
  dataUpdated$ = this.dataUpdated.asObservable();

  /**
   * Method to trigger a data update by emitting a value on the subject.
   */
  triggerDataUpdate() {
    this.dataUpdated.next();
  }
}
