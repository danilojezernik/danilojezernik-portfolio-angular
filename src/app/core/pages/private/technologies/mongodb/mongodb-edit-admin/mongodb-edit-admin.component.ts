import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  BreadcrumbAdminComponent
} from "../../../../../../shared/components/breadcrumb-admin/breadcrumb-admin.component";
import {GoBackComponent} from "../../../../../../shared/components/go-back/go-back.component";
import {LoadingComponent} from "../../../../../../shared/components/loading/loading.component";
import {
  ReusableFormEditComponent
} from "../../../../../../shared/forms/reusable-form-edit/reusable-form-edit.component";
import {formTechnologiesConfig} from "../../../../../../shared/global-const/form-config";
import {AngularService} from "../../../../../../services/api/angular.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {catchError, map, of} from "rxjs";
import {Angular} from "../../../../../../models/angular.model";
import {MongodbService} from "../../../../../../services/api/mongodb.service";
import {MongoDb} from "../../../../../../models/mongodb.model";

@Component({
  selector: 'app-mongodb-edit-admin',
  standalone: true,
  imports: [CommonModule, BreadcrumbAdminComponent, GoBackComponent, LoadingComponent, ReusableFormEditComponent],
  templateUrl: './mongodb-edit-admin.component.html'
})
export class MongodbEditAdminComponent implements OnInit {

  // Injected services for managing MongoDB data, accessing route parameters, navigation, and translations
  private _mongodbService = inject(MongodbService); // Service for managing MongoDB data
  private _activatedRoute = inject(ActivatedRoute); // Service for accessing route parameters
  private _router = inject(Router); // Service for navigation
  private _translateService = inject(TranslateService); // Service for translating error messages

  // Property to store error messages; initially set to null
  error: string | null = null;

  // Property to track loading state; initially set to false
  loading: boolean = false;

  // Object to hold the MongoDB data to be edited; initially set to an empty object
  formData: any = {};

  /**
   * @method ngOnInit
   * Lifecycle hook that is called after Angular has initialized all data-bound properties.
   * Retrieves the MongoDB document ID from the route parameters and fetches the corresponding data.
   */
  ngOnInit() {
    // Retrieve the MongoDB document ID from the route parameters
    const mongoId = this._activatedRoute.snapshot.paramMap.get('id') || '';

    // Set loading to true to show the spinner
    this.loading = true;

    // Fetch the MongoDB data using the MongodbService based on the retrieved ID
    this._mongodbService.getMongoDbById(mongoId).pipe(
      map(data => {
        this.formData = data; // Populate formData with the fetched data
        this.loading = false; // Hide the spinner after loading
      }),
      catchError((error) => {
        this.loading = false; // Hide the spinner after loading
        // Extract the error message
        const message = error.message;
        // Translate the error message and assign it to the error property
        this._translateService.get(message).subscribe((translation) => {
          this.error = translation;
        });
        // Return an observable of an empty array to handle errors gracefully
        return of([] as MongoDb[]);
      })
    ).subscribe();
  }

  /**
   * @method editMongoDb
   * Updates an existing MongoDB document with new data and navigates to the MongoDB admin page upon success.
   *
   * @param formValue - The form data submitted by the user.
   */
  editMongoDb(formValue: MongoDb) {
    // Set loading to true to show the spinner
    this.loading = true;

    // Retrieve the current MongoDB document ID from the route parameters
    const mongodbId = this._activatedRoute.snapshot.paramMap.get('id') || '';

    // Use MongodbService to update the MongoDB document with new data
    this._mongodbService.editMongoDbById(mongodbId, formValue).subscribe(() => {
      // Set loading to false after update
      this.loading = false;

      // Navigate the user back to the MongoDB admin page after editing is complete
      this._router.navigate(['/tech-all-mongodb']);
    }, (error) => {
      console.log('Error editing MongoDB: ', error);
      // Set loading to false if an error occurs
      this.loading = false;
    });
  }

  /**
   * Configuration for the MongoDB form
   * This configuration is used by the reusable form component.
   */
  protected readonly formTechnologiesConfig = formTechnologiesConfig;
}
