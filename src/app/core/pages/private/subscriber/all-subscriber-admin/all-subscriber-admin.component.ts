import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscribeService } from "../../../../../services/api/subscribe.service";
import { MatDialog } from "@angular/material/dialog";
import { BehaviorSubject, Observable } from "rxjs";
import { Subscriber } from "../../../../../models/subscriber";
import { openDialogUtil } from "../../../../../utils/open-dialog.util";
import { ButtonAdminComponent } from "../../../../../shared/components/button-admin/button-admin.component";
import { GoBackComponent } from "../../../../../shared/components/go-back/go-back.component";
import { ShowDataComponent } from "../../../../../shared/components/show-data/show-data.component";

@Component({
  selector: 'app-all-subscriber-admin',
  standalone: true,
  imports: [ CommonModule, ButtonAdminComponent, GoBackComponent, ShowDataComponent ],
  templateUrl: './all-subscriber-admin.component.html'
})
export class AllSubscriberAdminComponent {

  private _subscriberService = inject(SubscribeService)
  private _dialog = inject(MatDialog); // Injected MatDialog instance for dialogs

  // BehaviorSubject to store list of subscribers
  private _subscriberSubject = new BehaviorSubject<Subscriber[]>([]);

  // Observables to expose the subscriber list
  subscribers$ = this._subscriberSubject.asObservable();
  subscriberById$!: Observable<Subscriber>

  constructor() {
    this.getAllSubscribers()
  }

  /**
   * @method getAllSubscribers
   * Fetches all subscribers from the BlogService and assigns them to blogs$.
   */
  getAllSubscribers() {
    this._subscriberService.getAllSubscribers().subscribe(subscriber => {
      this._subscriberSubject.next(subscriber)
    })
  }

  /**
   * @method getSubscriberById
   * Fetches a single subscriber by its ID from the BlogService and assigns it to subscriberById$.
   * @param id - ID of the subscriber
   */
  getSubscriberById(id: string) {
    this.subscriberById$ = this._subscriberService.getSubscriberById(id)
  }

  /**
   * @method deleteSubscriberById
   * Deletes a single subscriber by its ID from the BlogService.
   * @param id - ID of the subscriber
   */
  deleteSubscriberById(id?: string) {
    if (id) {
      this._subscriberService.deleteSubscriberById(id).subscribe(() => {
        this.getAllSubscribers()
      })
    }
  }

  /**
   * @method openDialog
   * Opens a dialog to confirm the deletion of a subscriber.
   * @param id - ID of the subscriber
   */
  openDialog(id?: string) {
    if (id) {
      this.subscriberById$ = this._subscriberService.getSubscriberById(id)
      openDialogUtil(this._dialog, id, this.getSubscriberById.bind(this), this.subscriberById$, 'email', 'subscriber')
    }
  }

}
