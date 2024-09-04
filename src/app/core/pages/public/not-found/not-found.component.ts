import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {CommonModule, Location} from '@angular/common';
import {interval, Subscription} from "rxjs";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './not-found.component.html'
})
export class NotFoundComponent implements OnInit, OnDestroy {

  private _back = inject(Location)

  count: number = 5
  private countdownSubscription: Subscription = new Subscription()

  ngOnInit() {
    this.countdownSubscription = interval(1000).subscribe(() => {
      if(this.count > 0) {
        this.count--
      } else {
        // this.goBack()
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
