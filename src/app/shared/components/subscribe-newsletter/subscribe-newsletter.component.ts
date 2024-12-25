import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SubscribeService} from "../../../services/api/subscribe.service";
import {SubscriberClient} from "../../../models/subscriberClient";
import {of} from "rxjs";
import {ReusableFormAddComponent} from "../../forms/reusable-form-add/reusable-form-add.component";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-subscribe-newsletter',
  standalone: true,
  imports: [CommonModule, ReusableFormAddComponent, TranslateModule, FormsModule],
  templateUrl: './subscribe-newsletter.component.html'
})
export class SubscribeNewsletterComponent {

  private _subscriberService = inject(SubscribeService);
  private _router = inject(Router);
  private _translateService = inject(TranslateService);

  subscriber: SubscriberClient = {
    datum_vnosa: new Date().toISOString(),
    name: '',
    surname: '',
    email: '',
    confirmed: false
  };

  loading = false;
  error: string | null = null;

  onSubmit() {
    if (!this.subscriber.name || !this.subscriber.surname || !this.subscriber.email) {
      this.error = "All fields are required.";
      return;
    }

    this.error = null;
    this.loading = true;

    this._subscriberService.subscribeClient(this.subscriber).subscribe(
      () => {
        this.loading = false;
        this.subscriber.surname = ''
        this.subscriber.email = ''
        this.subscriber.name = ''
        this._router.navigate(['/success-subscribe']);
      },
      (error) => {
        this.loading = false;
        const message = error.message || "An error occurred.";
        this._translateService.get(message).subscribe((translation) => {
          this.error = translation;
        });
        return of([]);
      }
    );
  }}
