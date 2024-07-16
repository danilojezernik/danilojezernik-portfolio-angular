import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscribeService } from "../../../../../services/api/subscribe.service";
import { Router } from "@angular/router";
import { Subscriber } from "../../../../../models/subscriber";
import { formSubscriberConfig } from "../../../../../shared/global-const/form-config";
import { ReusableFormAddComponent } from "../../../../../shared/forms/reusable-form-add/reusable-form-add.component";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: 'app-add-subscriber-admin',
  standalone: true,
  imports: [ CommonModule, ReusableFormAddComponent, TranslateModule ],
  templateUrl: './add-subscriber-admin.component.html'
})
export class AddSubscriberAdminComponent {

  private _subscriberService = inject(SubscribeService)
  private _router = inject(Router)

  /**
   * @method addNewSubscriber
   * Method to add a new subscriber based on form inputs.
   * Validates required fields and calls SubscribeService to add the new subscriber.
   * Navigates back to the subscriber admin page after successful addition.
   *
   * @param formValidator - The form data to be validated and sent to the server for adding a new subscriber post.
   */
  addNewSubscriber(formValidator: Subscriber) {
    this._subscriberService.addSubscriber(formValidator).subscribe(() => {
      this._router.navigate([ 'subscriber-admin' ])
    })
  }

  protected readonly formSubscriberConfig = formSubscriberConfig;
}
