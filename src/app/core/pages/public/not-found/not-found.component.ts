import {Component, ElementRef, inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CommonModule, Location} from '@angular/common';
import {interval, Subscription} from "rxjs";
import {TranslateModule} from "@ngx-translate/core";
import anime from 'animejs/lib/anime.es.js';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './not-found.component.html'
})
export class NotFoundComponent implements OnInit, OnDestroy {
  @ViewChild('animation') animation: ElementRef;

  ngAfterViewInit(): void {
    this.animate1();
    this.animate2();
  }

  animate1(): void {
      anime({
        targets: '.row svg',
        translateY: 10,
        autoplay: true,
        loop: true,
        easing: 'easeInOutSine',
        direction: 'alternate'
      });

  }

  animate2(): void {

      anime({
        targets: '#zero',
        translateX: 10,
        autoplay: true,
        loop: true,
        easing: 'easeInOutSine',
        direction: 'alternate',
        scale: [{value: 1}, {value: 1.4}, {value: 1, delay: 250}],
        rotateY: {value: '+=180', delay: 200},
      });

  }

  private _back = inject(Location)

  count: number = 5
  private countdownSubscription: Subscription = new Subscription()

  ngOnInit() {
    this.countdownSubscription = interval(1000).subscribe(() => {
      if (this.count > 0) {
        this.count--
      } else {
        this.goBack()
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
