import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router} from "@angular/router";
import {interval, Subscription} from "rxjs";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-success-subscription-to-newsletter',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './success-subscription-to-newsletter.component.html'
})
export class SuccessSubscriptionToNewsletterComponent implements OnInit, OnDestroy {
  private router = inject(Router);

  count: number = 5
  private countdownSubscription: Subscription = new Subscription()

  ngOnInit() {
    this.countdownSubscription = interval(1000).subscribe(() => {
      if (this.count > 0) {
        this.count--
      } else {
        this.router.navigate(['/'])
      }
    })
  }

  ngOnDestroy() {
    // Clean up the subscription when the component is destroyed
    this.countdownSubscription.unsubscribe()
  }
}

