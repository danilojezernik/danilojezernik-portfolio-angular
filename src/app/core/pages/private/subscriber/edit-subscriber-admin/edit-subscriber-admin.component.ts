import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscribeService } from "../../../../../services/api/subscribe.service";
import { ActivatedRoute, Router } from "@angular/router";
import { map } from "rxjs";
import { GoBackComponent } from "../../../../../shared/components/go-back/go-back.component";
import { ReusableFormEditComponent } from "../../../../../shared/forms/reusable-form-edit/reusable-form-edit.component";
import { formSubscriberConfig } from "../../../../../shared/global-const/form-config";

@Component({
  selector: 'app-edit-subscriber-admin',
  standalone: true,
  imports: [ CommonModule, GoBackComponent, ReusableFormEditComponent ],
  templateUrl: './edit-subscriber-admin.component.html'
})
export class EditSubscriberAdminComponent implements OnInit {

  private _subscriberService = inject(SubscribeService)
  private _activatedRoute = inject(ActivatedRoute); // Provides access to route parameters
  private _router = inject(Router); // Helps navigate between routes

  formData: any = {}; // Object to hold the blog data to be edited

  /**
   * @method ngOnInit
   * Lifecycle hook that is called after Angular has initialized all data-bound properties.
   * Retrieves the subscriber ID from the route parameters and fetches corresponding subscribers data.
   */
  ngOnInit() {
    // Retrieve the blog ID from the route parameters
    const subscriberId = this._activatedRoute.snapshot.paramMap.get('id') || '';

    // Fetch the subscriber data using the SubscribeService based on the retrieved ID
    this._subscriberService.getSubscriberById(subscriberId).pipe(
      map(data => {
        this.formData = data; // Populate formData with fetched blog data
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

  protected readonly formSubscriberConfig = formSubscriberConfig;
}
