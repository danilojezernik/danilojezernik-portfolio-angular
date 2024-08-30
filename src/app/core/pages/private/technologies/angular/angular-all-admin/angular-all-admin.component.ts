import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BreadcrumbAdminComponent
} from "../../../../../../shared/components/breadcrumb-admin/breadcrumb-admin.component";
import {ButtonAdminComponent} from "../../../../../../shared/components/button-admin/button-admin.component";
import {GoBackComponent} from "../../../../../../shared/components/go-back/go-back.component";
import {LoadingComponent} from "../../../../../../shared/components/loading/loading.component";
import {ShowDataComponent} from "../../../../../../shared/components/show-data/show-data.component";
import {AngularService} from "../../../../../../services/api/angular.service";
import {GetImageService} from "../../../../../../services/get-image/get-image.service";
import {DialogAdminService} from "../../../../../../services/dialog-admin/dialog-admin.service";
import {TranslateService} from "@ngx-translate/core";
import {BehaviorSubject, catchError, finalize, Observable, of} from "rxjs";
import {Angular} from "../../../../../../models/angular.model";

@Component({
  selector: 'app-angular-all-admin',
  standalone: true,
  imports: [CommonModule, BreadcrumbAdminComponent, ButtonAdminComponent, GoBackComponent, LoadingComponent, ShowDataComponent],
  templateUrl: './angular-all-admin.component.html'
})
export class AngularAllAdminComponent {

  // Injected services for managing Angular data, retrieving images, opening dialogs, and translating messages
  private _angularService = inject(AngularService); // Service for managing Angular data
  protected _getImageByName = inject(GetImageService); // Service for retrieving images by name
  private _openDialog = inject(DialogAdminService); // Service for opening dialog windows
  private _translateService = inject(TranslateService); // Service for translating error messages

  // Property to store error messages; initially set to null
  error: string | null = null;

  // Property to track loading state; initially set to false
  loading: boolean = false;

  // Subject to store the list of Angular items
  private _angularSubject = new BehaviorSubject<Angular[]>([]);

  // Observable that provides the list of Angular items to the template
  angular$ = this._angularSubject.asObservable();

  // Observable to store a single Angular item fetched by ID
  angularById$!: Observable<Angular>;

  /**
   * Constructor to initialize the component.
   * Automatically loads all Angular items when the component is created.
   */
  constructor() {
    this.getAllAngular();
  }

  /**
   * @method getAllAngular
   * Fetches all Angular items from the AngularService and updates the angular$ observable.
   * Handles loading state and error messages.
   */
  getAllAngular() {
    this.loading = true; // Set loading state to true before making the API call

    this._angularService.getAllAngularAdmin().pipe(
      // Handle any errors that occur during the fetching process
      catchError((error) => {
        // Extract and translate the error message, then set it to the error property
        const message = error.message;
        this._translateService.get(message).subscribe((translation) => {
          this.error = translation;
        });
        // Return an observable of an empty array to handle errors gracefully
        return of([] as Angular[]);
      }),
      // Ensure loading state is set to false once the API call is complete
      finalize(() => this.loading = false)
    ).subscribe(items => {
      this.loading = false; // Set loading state to false after receiving the response
      this._angularSubject.next(items); // Update the BehaviorSubject with the fetched Angular items
    });
  }

  /**
   * @method getAngularById
   * Fetches a single Angular item by its ID from the AngularService and assigns it to angularById$.
   * @param id - ID of the Angular item to fetch
   */
  getAngularById(id: string) {
    this.angularById$ = this._angularService.getAngularById(id);
  }

  /**
   * @method deleteAngular
   * Deletes an Angular item by its ID.
   * After deletion, refreshes the list of Angular items by calling getAllAngular().
   * @param id - ID of the Angular item to delete
   */
  deleteAngular(id?: string) {
    if (id) {
      this._angularService.deleteAngularById(id).subscribe(() => {
        this.getAllAngular(); // Refresh the list of Angular items after deletion
      });
    }
  }

  /**
   * @method openDialog
   * Opens a dialog to view or edit an Angular item by its ID.
   * Fetches the item details and uses a utility function to open the dialog.
   * @param id - ID of the Angular item to fetch and display in the dialog
   */
  openDialog(id?: string) {
    if (id) {
      this.angularById$ = this._angularService.getAngularById(id); // Fetch Angular item details by ID
      this._openDialog.openDialogUtil(id, this.getAngularById.bind(this), this.angularById$, '_id', 'angular'); // Open dialog with fetched data
    }
  }
}
