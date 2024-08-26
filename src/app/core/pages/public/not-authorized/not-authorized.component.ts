import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {Location} from "@angular/common";
import {interval, Subscription} from "rxjs";

@Component({
  selector: 'app-not-authorized',
  templateUrl: './not-authorized.component.html'
})
export class NotAuthorizedComponent implements OnInit, OnDestroy {

  _back = inject(Location)

  count: number = 5
  private countdownSubscription: Subscription = new Subscription()

  ngOnInit() {
    // Start the countdown
    this.countdownSubscription = interval(1000).subscribe(() => {
      if (this.count > 0) {
        this.count--
      } else {
        this.goBack()
        this.countdownSubscription.unsubscribe() // Stop the interval when countdown ends
      }
    })
  }

  ngOnDestroy() {
    // Clean up the subscription when the component is destroyed
    this.countdownSubscription.unsubscribe()
  }

  goBack() {
    this._back.back()
  }
}
