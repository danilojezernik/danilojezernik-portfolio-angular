import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperiencesService } from "../../../../../services/api/experiences.service";
import { ActivatedRoute, Router } from "@angular/router";
import { map } from "rxjs";
import { GoBackComponent } from "../../../../../shared/components/go-back/go-back.component";
import { ReusableFormEditComponent } from "../../../../../shared/forms/reusable-form-edit/reusable-form-edit.component";
import { formExperiencesConfig } from "../../../../../shared/global-const/form-config";

@Component({
  selector: 'app-edit-experiences-admin',
  standalone: true,
  imports: [ CommonModule, GoBackComponent, ReusableFormEditComponent ],
  templateUrl: './edit-experiences-admin.component.html'
})
export class EditExperiencesAdminComponent implements OnInit {

  private _experiencesService = inject(ExperiencesService); // Service for experience-related operations
  private _activatedRoute = inject(ActivatedRoute); // Provides access to route parameters
  private _router = inject(Router); // Helps navigate between routes

  formData: any = {}; // Object to hold the experience data to be edited

  ngOnInit() {
    const experiencesId = this._activatedRoute.snapshot.paramMap.get('id') || ''

    this._experiencesService.getExperienceById(experiencesId).pipe(
      map(data => {
        this.formData = data; // Populate formData with fetched experience data
      })
    ).subscribe()

  }

  editExperiences(formValue: any) {

    const experiencesId = this._activatedRoute.snapshot.paramMap.get('id') || ''

    this._experiencesService.editExperienceById(experiencesId, formValue).subscribe(() => {
      this._router.navigate([ 'experiences-admin' ])
    })
  }

  protected readonly formExperiencesConfig = formExperiencesConfig;
}
