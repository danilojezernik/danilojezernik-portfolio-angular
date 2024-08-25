import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscribeService } from "../../../../../services/api/subscribe.service";
import { MatDialog } from "@angular/material/dialog";
import { BehaviorSubject, catchError, finalize, Observable, of } from "rxjs";
import { SubscriberClient } from "../../../../../models/subscriberClient";
import { openDialogUtil } from "../../../../../utils/open-dialog.util";
import { ButtonAdminComponent } from "../../../../../shared/components/button-admin/button-admin.component";
import { GoBackComponent } from "../../../../../shared/components/go-back/go-back.component";
import { ShowDataComponent } from "../../../../../shared/components/show-data/show-data.component";
import { TranslateService } from "@ngx-translate/core";
import { LoadingComponent } from "../../../../../shared/components/loading/loading.component";
import {BreadcrumbAdminComponent} from "../../../../../shared/components/breadcrumb-admin/breadcrumb-admin.component";

/**
 * @Component AllSubscriberAdminComponent
 * Component for displaying and managing all subscribers in the admin panel.
 * Uses the SubscribeService to fetch and delete subscribers, and displays them using the ShowDataComponent.
 */

@Component({
  selector: 'app-all-subscriber-admin',
  standalone: true,
    imports: [CommonModule, ButtonAdminComponent, GoBackComponent, ShowDataComponent, LoadingComponent, BreadcrumbAdminComponent],
  templateUrl: './all-subscriber-admin.component.html'
})
export class AllSubscriberAdminComponent {

  private _subscriberService = inject(SubscribeService); // Injected SubscribeService instance for managing subscribers
  private _dialog = inject(MatDialog); // Injected MatDialog instance for dialogs
  private _translateService = inject(TranslateService); // Injected TranslateService instance for translations

  // Property to store error messages, initialized to null
  error: string | null = null;
  // Property to track loading state, initialized to false
  loading: boolean = false;

  // BehaviorSubject to store list of subscribers
  private _subscriberSubject = new BehaviorSubject<SubscriberClient[]>([]);

  // Observables to expose the subscriber list
  subscribers$ = this._subscriberSubject.asObservable();
  subscriberById$!: Observable<SubscriberClient>;

  /**
   * Constructor to initialize the component.
   * Calls the getAllSubscribers method to load all subscribers.
   */
  constructor() {
    this.getAllSubscribers();
  }

  /**
   * @method getAllSubscribers
   * Fetches all subscribers from the SubscribeService and assigns them to subscribers$.
   */
  getAllSubscribers() {
    this.loading = true; // Set loading state to true before making the API call

    this._subscriberService.getAllSubscribers().pipe(
      // Handle any errors that occur during the fetching process
      catchError((error) => {
        // Extract and translate the error message, then set it to the error property
        const message = error.message;
        this._translateService.get(message).subscribe((translation) => {
          this.error = translation;
        });
        // Return an observable of an empty array to handle errors gracefully
        return of([] as SubscriberClient[]);
      }),
      // Ensure loading state is set to false once the API call is complete
      finalize(() => this.loading = false)
    ).subscribe(subscriber => {
      this.loading = false; // Set loading state to false after receiving the response
      this._subscriberSubject.next(subscriber);
    });
  }

  /**
   * @method getSubscriberById
   * Fetches a single subscriber by its ID from the SubscribeService and assigns it to subscriberById$.
   * @param id - ID of the subscriber
   */
  getSubscriberById(id: string) {
    this.subscriberById$ = this._subscriberService.getSubscriberById(id);
  }

  /**
   * @method deleteSubscriberById
   * Deletes a single subscriber by its ID from the SubscribeService.
   * @param id - ID of the subscriber
   */
  deleteSubscriberById(id?: string) {
    if (id) {
      this._subscriberService.deleteSubscriberById(id).subscribe(() => {
        this.getAllSubscribers(); // Refresh the list of subscribers after deletion
      });
    }
  }

  /**
   * @method openDialog
   * Opens a dialog to confirm the deletion of a subscriber.
   * @param id - ID of the subscriber
   */
  openDialog(id?: string) {
    if (id) {
      this.subscriberById$ = this._subscriberService.getSubscriberById(id);
      openDialogUtil(this._dialog, id, this.getSubscriberById.bind(this), this.subscriberById$, 'email', 'subscriber');
    }
  }
}
