import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BreadcrumbAdminComponent
} from "../../../../../../shared/components/breadcrumb-admin/breadcrumb-admin.component";
import {GoBackComponent} from "../../../../../../shared/components/go-back/go-back.component";
import {LoadingComponent} from "../../../../../../shared/components/loading/loading.component";
import {ReusableFormAddComponent} from "../../../../../../shared/forms/reusable-form-add/reusable-form-add.component";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {formTechnologiesConfig} from "../../../../../../shared/global-const/form-config";
import {Router} from "@angular/router";
import {of} from "rxjs";
import {MongodbService} from "../../../../../../services/api/mongodb.service";
import {MongoDb} from "../../../../../../models/mongodb.model";

@Component({
  selector: 'app-mongodb-add-admin',
  standalone: true,
  imports: [CommonModule, BreadcrumbAdminComponent, GoBackComponent, LoadingComponent, ReusableFormAddComponent, TranslateModule],
  templateUrl: './mongodb-add-admin.component.html'
})
export class MongodbAddAdminComponent {

  // Injected services for managing MongoDB data, navigating routes, and translating messages
  private _mongodbService = inject(MongodbService); // Service for managing MongoDB data
  private _router = inject(Router); // Service for navigation between routes
  private _translateService = inject(TranslateService); // Service for translating error messages

  // Property to store error messages; initially set to null
  error: string | null = null;

  // Property to track loading state; initially set to false
  loading: boolean = false;

  /**
   * @method addNewMongoDb
   * Adds a new MongoDB entry based on form inputs.
   * Validates required fields and uses MongodbService to add the new entry.
   * After successful addition, navigates back to the MongoDB admin page.
   *
   * @param formValidator - The form data to be validated and sent to the server for adding a new MongoDB entry.
   */
  addNewMongoDb(formValidator: MongoDb) {
    // Set loading to true to show spinner
    this.loading = true;

    // Use MongodbService to add the new entry
    this._mongodbService.addMongoDb(formValidator).subscribe(() => {
      // On success, set loading to false and navigate to the MongoDB admin page
      this.loading = false;
      this._router.navigate(['tech-all-mongodb']);
    }, (error) => {
      // On error, set loading to false
      this.loading = false;

      // Extract the error message from the response
      const message = error.message;
      // Translate the error message and assign it to the error property
      this._translateService.get(message).subscribe((translation) => {
        this.error = translation;
      });

      // Return an observable of an empty array to handle errors gracefully
      return of([] as MongoDb[]);
    });
  }

  /**
   * Form configuration for MongoDB
   * This configuration is used by the reusable form component.
   */
  protected readonly formTechnologiesConfig = formTechnologiesConfig;
}
