import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BreadcrumbAdminComponent
} from "../../../../../../shared/components/breadcrumb-admin/breadcrumb-admin.component";
import {ButtonAdminComponent} from "../../../../../../shared/components/button-admin/button-admin.component";
import {GoBackComponent} from "../../../../../../shared/components/go-back/go-back.component";
import {LoadingComponent} from "../../../../../../shared/components/loading/loading.component";
import {ShowDataComponent} from "../../../../../../shared/components/show-data/show-data.component";
import {GetImageService} from "../../../../../../services/get-image/get-image.service";
import {DialogAdminService} from "../../../../../../services/dialog-admin/dialog-admin.service";
import {TranslateService} from "@ngx-translate/core";
import {BehaviorSubject, catchError, finalize, Observable, of} from "rxjs";
import {MongodbService} from "../../../../../../services/api/mongodb.service";
import {MongoDb} from "../../../../../../models/mongodb.model";

@Component({
  selector: 'app-mongodb-all-admin',
  standalone: true,
  imports: [CommonModule, BreadcrumbAdminComponent, ButtonAdminComponent, GoBackComponent, LoadingComponent, ShowDataComponent],
  templateUrl: './mongodb-all-admin.component.html'
})
export class MongodbAllAdminComponent {

  // Injected services for managing MongoDB data, retrieving images, opening dialogs, and translating messages
  private _mongodbService = inject(MongodbService); // Service for managing MongoDB data
  protected _getImageByName = inject(GetImageService); // Service for retrieving images by name
  private _openDialog = inject(DialogAdminService); // Service for opening dialog windows
  private _translateService = inject(TranslateService); // Service for translating error messages

  // Property to store error messages; initially set to null
  error: string | null = null;

  // Property to track loading state; initially set to false
  loading: boolean = false;

  // Subject to store the list of MongoDB documents
  private _mongodbSubject = new BehaviorSubject<MongoDb[]>([]);

  // Observable that provides the list of MongoDB documents to the template
  mongodb$ = this._mongodbSubject.asObservable();

  // Observable to store a single MongoDB document fetched by ID
  mongodbById$!: Observable<MongoDb>;

  /**
   * Constructor to initialize the component.
   * Automatically loads all MongoDB documents when the component is created.
   */
  constructor() {
    this.getAllMongoDb();
  }

  /**
   * @method getAllMongoDb
   * Fetches all MongoDB documents from the MongodbService and updates the mongodb$ observable.
   * Handles loading state and error messages.
   */
  getAllMongoDb() {
    this.loading = true; // Set loading state to true before making the API call

    this._mongodbService.getAllMongoDbAdmin().pipe(
      // Handle any errors that occur during the fetching process
      catchError((error) => {
        // Extract and translate the error message, then set it to the error property
        const message = error.message;
        this._translateService.get(message).subscribe((translation) => {
          this.error = translation;
        });
        // Return an observable of an empty array to handle errors gracefully
        return of([] as MongoDb[]);
      }),
      // Ensure loading state is set to false once the API call is complete
      finalize(() => this.loading = false)
    ).subscribe(mongodb => {
      this.loading = false; // Set loading state to false after receiving the response
      this._mongodbSubject.next(mongodb); // Update the BehaviorSubject with the fetched MongoDB documents
    });
  }

  /**
   * @method getMongoDbById
   * Fetches a single MongoDB document by its ID from the MongodbService and assigns it to mongodbById$.
   * @param id - ID of the MongoDB document to fetch
   */
  getMongoDbById(id: string) {
    this.mongodbById$ = this._mongodbService.getMongoDbById(id);
  }

  /**
   * @method deleteMongoDb
   * Deletes a MongoDB document by its ID.
   * After deletion, refreshes the list of MongoDB documents by calling getAllMongoDb().
   * @param id - ID of the MongoDB document to delete
   */
  deleteMongoDb(id?: string) {
    if (id) {
      this._mongodbService.deleteMongoDbById(id).subscribe(() => {
        this.getAllMongoDb(); // Refresh the list of MongoDB documents after deletion
      });
    }
  }

  /**
   * @method openDialog
   * Opens a dialog to view or edit a MongoDb document by its ID.
   * Fetches the document details and uses a utility function to open the dialog.
   * @param id - ID of the MongoDb document to fetch and display in the dialog
   */
  openDialog(id?: string) {
    if (id) {
      this.mongodbById$ = this._mongodbService.getMongoDbById(id); // Fetch MongoDB document details by ID
      this._openDialog.openDialogUtil(id, this.getMongoDbById.bind(this), this.mongodbById$, '_id', 'mongodb'); // Open dialog with fetched data
    }
  }
}
