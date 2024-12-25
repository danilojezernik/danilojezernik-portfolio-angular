import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscribeService } from "../../../../../services/api/subscribe.service";
import { Router } from "@angular/router";
import { SubscriberClient } from "../../../../../models/subscriberClient";
import { formSubscriberConfig } from "../../../../../shared/global-const/form-config";
import { ReusableFormAddComponent } from "../../../../../shared/forms/reusable-form-add/reusable-form-add.component";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { of } from "rxjs";
import { GoBackComponent } from "../../../../../shared/components/go-back/go-back.component";
import { LoadingComponent } from "../../../../../shared/components/loading/loading.component";
import {BreadcrumbAdminComponent} from "../../../../../shared/components/breadcrumb-admin/breadcrumb-admin.component";

@Component({
  selector: 'app-add-subscriber-admin',
  standalone: true,
    imports: [CommonModule, ReusableFormAddComponent, TranslateModule, GoBackComponent, LoadingComponent, BreadcrumbAdminComponent],
  templateUrl: './add-subscriber-admin.component.html'
})
export class AddSubscriberAdminComponent {

  private _subscriberService = inject(SubscribeService)
  private _router = inject(Router)
  private _translateService = inject(TranslateService); // Injecting TranslateService for translating error messages

  // Property to store error messages, initialized to null
  error: string | null = null;

  // Property to track loading state, initialized to false
  loading: boolean = false;

  /**
   * @method addNewSubscriber
   * Method to add a new subscriber based on form inputs.
   * Validates required fields and calls SubscribeService to add the new subscriber.
   * Navigates back to the subscriber admin page after successful addition.
   *
   * @param formValidator - The form data to be validated and sent to the server for adding a new subscriber post.
   */
  addNewSubscriber(formValidator: SubscriberClient) {
    // Show spinner while loading
    this.loading = true;

    this._subscriberService.subscribeClient(formValidator).subscribe(() => {
      // Hide spinner after loading
      this.loading = false;

      this._router.navigate([ 'subscriber-admin' ])
    }, (error) => {
      // Hide spinner after loading
      this.loading = false;

      // Extract the error message
      const message = error.message;
      // Translate the error message using the Translation service and set it to the error property
      this._translateService.get(message).subscribe((translation) => {
        this.error = translation;
      });

      // Return an observable of an empty array to handle errors gracefully
      return of([] as SubscriberClient[]);
    })
  }

  protected readonly formSubscriberConfig = formSubscriberConfig;
}
