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
import {ActivatedRoute, Router} from "@angular/router";
import {TranslateService} from "@ngx-translate/core";
import {catchError, map, of} from "rxjs";
import {PythonService} from "../../../../../../services/api/python.service";
import {Python} from "../../../../../../models/python.mondel";

@Component({
  selector: 'app-python-edit-admin',
  standalone: true,
  imports: [CommonModule, BreadcrumbAdminComponent, GoBackComponent, LoadingComponent, ReusableFormEditComponent],
  templateUrl: './python-edit-admin.component.html'
})
export class PythonEditAdminComponent implements OnInit {

  // Injected services for managing Python data, accessing route parameters, navigating routes, and translating messages
  private _pythonService = inject(PythonService); // Service for managing Python-related data
  private _activatedRoute = inject(ActivatedRoute); // Service for accessing route parameters
  private _router = inject(Router); // Service for navigating between routes
  private _translateService = inject(TranslateService); // Service for translating error messages

  // Property to store error messages, initially set to null
  error: string | null = null;

  // Property to track loading state, initially set to false
  loading: boolean = false;

  // Object to hold the Python data to be edited, initially set to an empty object
  formData: any = {};

  /**
   * @method ngOnInit
   * Lifecycle hook that is called after Angular has initialized all data-bound properties.
   * Retrieves the Python ID from the route parameters and fetches corresponding Python data.
   */
  ngOnInit() {
    // Retrieve the Python ID from the route parameters
    const pythonId = this._activatedRoute.snapshot.paramMap.get('id') || '';

    // Set loading to true to show the spinner
    this.loading = true;

    // Fetch the Python data using the PythonService based on the retrieved ID
    this._pythonService.getPythonById(pythonId).pipe(
      map(data => {
        this.formData = data; // Populate formData with fetched Python data
        this.loading = false; // Set loading to false after data is loaded
      }),
      catchError((error) => {
        this.loading = false; // Set loading to false in case of an error
        // Extract the error message
        const message = error.message;
        // Translate the error message using the TranslateService and set it to the error property
        this._translateService.get(message).subscribe((translation) => {
          this.error = translation;
        });
        // Return an observable of an empty array to handle errors gracefully
        return of([] as Python[]);
      })
    ).subscribe();
  }

  /**
   * @method editPython
   * Updates an existing Python entry with new data and navigates to the admin Python page upon success.
   *
   * @param formValue - The form data submitted by the user.
   */
  editPython(formValue: Python) {
    // Set loading to true to show the spinner
    this.loading = true;

    // Retrieve the current Python ID from the route parameters
    const pythonId = this._activatedRoute.snapshot.paramMap.get('id') || '';

    // Use PythonService to update the Python entry with new data
    this._pythonService.editPythonById(pythonId, formValue).subscribe(() => {
      // Set loading to false after update
      this.loading = false;

      // Navigate the user back to the Python admin page after editing is complete
      this._router.navigate(['/tech-all-python']);
    }, (error) => {
      console.log('Error editing Python: ', error);
      // Set loading to false in case of an error
      this.loading = false;
    });
  }

  /**
   * Form configuration for Python
   * This configuration is used by the reusable form component.
   */
  protected readonly formTechnologiesConfig = formTechnologiesConfig;
}
