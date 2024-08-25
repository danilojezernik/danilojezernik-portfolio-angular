import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscribeService } from "../../../../../services/api/subscribe.service";
import { ActivatedRoute, Router } from "@angular/router";
import { catchError, map, of } from "rxjs";
import { GoBackComponent } from "../../../../../shared/components/go-back/go-back.component";
import { ReusableFormEditComponent } from "../../../../../shared/forms/reusable-form-edit/reusable-form-edit.component";
import { formSubscriberConfig } from "../../../../../shared/global-const/form-config";
import { TranslateService } from "@ngx-translate/core";
import { SubscriberClient } from "../../../../../models/subscriberClient";
import { LoadingComponent } from "../../../../../shared/components/loading/loading.component";
import {BreadcrumbAdminComponent} from "../../../../../shared/components/breadcrumb-admin/breadcrumb-admin.component";

/**
 * @Component EditSubscriberAdminComponent
 * Component for editing a subscriber's information in the admin interface.
 */

@Component({
  selector: 'app-edit-subscriber-admin',
  standalone: true,
    imports: [CommonModule, GoBackComponent, ReusableFormEditComponent, LoadingComponent, BreadcrumbAdminComponent],
  templateUrl: './edit-subscriber-admin.component.html'
})
export class EditSubscriberAdminComponent implements OnInit {

  private _subscriberService = inject(SubscribeService); // Injecting SubscribeService for subscriber-related operations
  private _activatedRoute = inject(ActivatedRoute); // Provides access to route parameters
  private _router = inject(Router); // Helps navigate between routes
  private _translateService = inject(TranslateService); // Injecting TranslateService for translating error messages

  // Property to store error messages, initialized to null
  error: string | null = null;

  // Property to track loading state, initialized to false
  loading: boolean = false;

  // Object to hold the subscriber data to be edited
  formData: any = {};

  /**
   * @method ngOnInit
   * Lifecycle hook that is called after Angular has initialized all data-bound properties.
   * Retrieves the subscriber ID from the route parameters and fetches corresponding subscriber data.
   */
  ngOnInit() {
    // Retrieve the subscriber ID from the route parameters
    const subscriberId = this._activatedRoute.snapshot.paramMap.get('id') || '';

    // Show spinner while loading
    this.loading = true;

    // Fetch the subscriber data using the SubscribeService based on the retrieved ID
    this._subscriberService.getSubscriberById(subscriberId).pipe(
      map(data => {
        this.formData = data; // Populate formData with fetched subscriber data
        this.loading = false; // Hide spinner after loading
      }),
      catchError((error) => {
        this.loading = false; // Hide spinner after loading
        // Extract the error message
        const message = error.message;
        // Translate the error message using the TranslateService and set it to the error property
        this._translateService.get(message).subscribe((translation) => {
          this.error = translation;
        });
        // Return an observable of an empty array to handle errors gracefully
        return of([] as SubscriberClient[]);
      })
    ).subscribe();
  }

  /**
   * @method editSubscriber
   * Updates an existing subscriber with new data and navigates to the admin subscriber page upon success.
   *
   * @param formValue - The form data submitted by the user.
   */
  editSubscriber(formValue: any) {
    // Retrieve the current subscriber ID from the route parameters
    const subscriberId = this._activatedRoute.snapshot.paramMap.get('id') || '';

    // Call the SubscribeService method to update the subscriber with new data
    this._subscriberService.editSubscriberById(subscriberId, formValue).subscribe(() => {
      this._router.navigate([ '/subscriber-admin' ]);
    });
  }

  /**
   * Form configuration for subscribers
   * Uses predefined formSubscriberConfig from a global constant file
   */
  protected readonly formSubscriberConfig = formSubscriberConfig;
}
