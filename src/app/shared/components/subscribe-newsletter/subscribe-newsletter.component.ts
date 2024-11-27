import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {SubscribeService} from "../../../services/api/subscribe.service";
import {SubscriberClient} from "../../../models/subscriberClient";
import {Observable} from "rxjs";

@Component({
  selector: 'app-subscribe-newsletter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subscribe-newsletter.component.html'
})
export class SubscribeNewsletterComponent {

  private _subscribeService = inject(SubscribeService)

  clientSubscription$: Observable<SubscriberClient>
}
