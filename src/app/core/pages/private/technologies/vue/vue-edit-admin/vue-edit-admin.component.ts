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
import {VueService} from "../../../../../../services/api/vue.service";
import {Vue} from "../../../../../../models/vue.model";

@Component({
  selector: 'app-vue-edit-admin',
  standalone: true,
  imports: [CommonModule, BreadcrumbAdminComponent, GoBackComponent, LoadingComponent, ReusableFormEditComponent],
  templateUrl: './vue-edit-admin.component.html'
})
export class VueEditAdminComponent implements OnInit {
  // Injected services for managing Vue data, accessing route parameters, navigating routes, and translating messages
  private _vueService = inject(VueService); // Service for managing Vue-related data
  private _activatedRoute = inject(ActivatedRoute); // Service for accessing route parameters
  private _router = inject(Router); // Service for navigating between routes
  private _translateService = inject(TranslateService); // Service for translating error messages

  // Property to store error messages, initialized to null
  error: string | null = null;

  // Property to track loading state, initialized to false
  loading: boolean = false;

  // Object to hold the Vue data to be edited, initialized to an empty object
  formData: any = {};

  /**
   * @method ngOnInit
   * Lifecycle hook that is called after Angular has initialized all data-bound properties.
   * Retrieves the Vue ID from the route parameters and fetches the corresponding Vue data.
   */
  ngOnInit() {
    // Retrieve the Vue ID from the route parameters
    const vueId = this._activatedRoute.snapshot.paramMap.get('id') || '';

    // Show spinner while loading
    this.loading = true;

    // Fetch the Vue data using the VueService based on the retrieved ID
    this._vueService.getVueById(vueId).pipe(
      map(data => {
        this.formData = data; // Populate formData with the fetched Vue data
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
        return of([] as Vue[]);
      })
    ).subscribe();
  }

  /**
   * @method editVue
   * Updates an existing Vue entry with new data and navigates to the admin Vue page upon success.
   *
   * @param formValue - The form data submitted by the user.
   */
  editVue(formValue: Vue) {

    // Show spinner while loading
    this.loading = true;

    // Retrieve the current Vue ID from the route parameters
    const vueId = this._activatedRoute.snapshot.paramMap.get('id') || '';

    // Call the VueService method to update the Vue entry with new data
    this._vueService.editVueById(vueId, formValue).subscribe(() => {

      // Hide spinner after loading
      this.loading = false;

      // Navigate the user back to the Vue admin page after editing is complete
      this._router.navigate([ '/tech-all-vue' ]);
    }, (error) => {
      console.log('Error editing Vue: ', error)
      // Hide spinner after loading
      this.loading = false;
    });
  }

  /**
   * Form configuration for Vue
   * This configuration is used by the reusable form component.
   */
  protected readonly formTechnologiesConfig = formTechnologiesConfig;

}
