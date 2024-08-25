import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { formLinksConfig } from "../../../../../shared/global-const/form-config";
import { ReusableFormAddComponent } from "../../../../../shared/forms/reusable-form-add/reusable-form-add.component";
import { LinksService } from "../../../../../services/api/links.service";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { of } from "rxjs";
import { Links } from "../../../../../models/links";
import { GoBackComponent } from "../../../../../shared/components/go-back/go-back.component";
import { LoadingComponent } from "../../../../../shared/components/loading/loading.component";
import {BreadcrumbAdminComponent} from "../../../../../shared/components/breadcrumb-admin/breadcrumb-admin.component";

/**
 * @Component AddLinksComponent
 * Component for adding new links in the admin panel.
 * Uses a reusable form component to handle the form for adding links.
 */

@Component({
  selector: 'app-add-links',
  standalone: true,
    imports: [CommonModule, ReusableFormAddComponent, GoBackComponent, LoadingComponent, BreadcrumbAdminComponent],
  templateUrl: './add-links.component.html'
})
export class AddLinksComponent {

  // Inject the LinksService to use its methods
  private _linksService = inject(LinksService);
  // Injecting Router for navigating between routes
  private _router = inject(Router);
  private _translateService = inject(TranslateService); // Injecting TranslateService for translating error messages

  // Property to store error messages, initialized to null
  error: string | null = null;

  // Property to track loading state, initialized to false
  loading: boolean = false;

  /**
   * @method addNewLink
   * Adds a new link using the LinksService and navigates to the admin links page upon success.
   * @param formValidator - The form data submitted by the user
   */
  addNewLink(formValidator: any) {
    // Show spinner while loading
    this.loading = true;

    this._linksService.addLink(formValidator).subscribe(() => {
      // Hide spinner after loading
      this.loading = false;

      // Navigate to the admin links page after successfully adding a new link
      this._router.navigate([ 'links-admin' ]);
    }, (error) => {
      // Hide spinner after loading
      this.loading = false;

      // Extract the error message
      const message = error.message;
      // Translate the error message using the Translation service and set it to the error property
      this._translateService.get(message).subscribe((translation) => {
        this.error = translation;
      });

      // Return an observable of an empty array to handle errors gracefully
      return of([] as Links[]);
    });
  }

  // Reference to formLinksConfig for configuring the form fields
  protected readonly formLinksConfig = formLinksConfig;
}
