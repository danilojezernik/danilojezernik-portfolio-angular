import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechnologyService } from "../../../../../services/api/technology.service";
import { ActivatedRoute, Router } from "@angular/router";
import { map } from "rxjs";
import { Technology } from "../../../../../models/technology";
import { GoBackComponent } from "../../../../../shared/components/go-back/go-back.component";
import { ReusableFormEditComponent } from "../../../../../shared/forms/reusable-form-edit/reusable-form-edit.component";
import { formTechnologyConfig } from "../../../../../shared/global-const/form-config";

/**
 * @Component EditTechnologyComponent
 * Represents the component responsible for editing a technology post by ID in the admin interface.
 */

@Component({
  selector: 'app-edit-technology-technology',
  standalone: true,
  imports: [ CommonModule, GoBackComponent, ReusableFormEditComponent ],
  templateUrl: './edit-technology.component.html'
})
export class EditTechnologyComponent implements OnInit {

  private _technologyService = inject(TechnologyService)
  private _activatedRoute = inject(ActivatedRoute)
  private _router = inject(Router)

  formData: any = {}; // Object to hold the blog data to be edited

  /**
   * @method ngOnInit
   * Lifecycle hook that is called after Angular has initialized all data-bound properties.
   * Retrieves the technology ID from the route parameters and fetches corresponding blog data.
   */
  ngOnInit() {
    // Retrieve the technology ID from the route parameters
    const technologyId = this._activatedRoute.snapshot.paramMap.get('id') || '';

    // Fetch the technology data using the TechnologyService based on the retrieved ID
    this._technologyService.getTechnologyById(technologyId).pipe(
      map(data => {
        this.formData = data; // Populate formData with fetched blog data
      })
    ).subscribe()
  }

  /**
   * @method editTechnology
   * Updates an existing technology post with new data and navigates to the admin blog page upon success.
   *
   * @param formValue - The form data submitted by the user.
   */
  editTechnology(formValue: Technology) {
    const technologyId = this._activatedRoute.snapshot.paramMap.get('id') || '';

    this._technologyService.editTechnologyById(technologyId, formValue).subscribe(() => {
      this._router.navigate([ '/technology-admin' ])
    })
  }

  /**
   * Form configuration for technology
   * Uses predefined formTechnologyConfig from a global constant file
   * */
  protected readonly formTechnologyConfig = formTechnologyConfig;
}
