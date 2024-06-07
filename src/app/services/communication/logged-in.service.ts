import { Injectable } from '@angular/core';

// BehaviorSubject allows us to track a value over time
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoggedInService {

  // Creating a BehaviorSubject to track the user's login status. It starts with an initial value of false (user not logged in).
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  // Creating an observable to allow components to subscribe to changes in the login status.
  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  
}
