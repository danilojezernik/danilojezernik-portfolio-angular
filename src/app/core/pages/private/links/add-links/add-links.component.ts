import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { formLinksConfig } from "../../../../../shared/global-const/form-config";
import { ReusableFormAddComponent } from "../../../../../shared/forms/reusable-form-add/reusable-form-add.component";
import { LinksService } from "../../../../../services/api/links.service";
import { Router } from "@angular/router";

/**
 * @Component AddLinksComponent
 * Component for adding new links in the admin panel.
 * Uses a reusable form component to handle the form for adding links.
 */

@Component({
  selector: 'app-add-links',
  standalone: true,
  imports: [ CommonModule, ReusableFormAddComponent ],
  templateUrl: './add-links.component.html'
})
export class AddLinksComponent {

  // Inject the LinksService to use its methods
  private _linksService = inject(LinksService);
  // Injecting Router for navigating between routes
  private _router = inject(Router);

  /**
   * @method addNewLink
   * Adds a new link using the LinksService and navigates to the admin links page upon success.
   * @param formValidator - The form data submitted by the user
   */
  addNewLink(formValidator: any) {
    this._linksService.addLink(formValidator).subscribe(() => {
      // Navigate to the admin links page after successfully adding a new link
      this._router.navigate([ 'links-admin' ]);
    });
  }

  // Reference to formLinksConfig for configuring the form fields
  protected readonly formLinksConfig = formLinksConfig;
}
