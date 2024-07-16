import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperiencesService } from "../../../../../services/api/experiences.service";
import { Router } from "@angular/router";
import { Experiences } from "../../../../../models/experiences";
import { formExperiencesConfig } from "../../../../../shared/global-const/form-config";
import { ReusableFormAddComponent } from "../../../../../shared/forms/reusable-form-add/reusable-form-add.component";
import { TranslateModule } from "@ngx-translate/core";

@Component({
  selector: 'app-add-experiences-admin',
  standalone: true,
  imports: [ CommonModule, ReusableFormAddComponent, TranslateModule ],
  templateUrl: './add-experiences-admin.component.html'
})
export class AddExperiencesAdminComponent {

  private _experiencesService = inject(ExperiencesService)
  private _router = inject(Router)

  addNewExperience(formValidator: Experiences) {
    this._experiencesService.addExperience(formValidator).subscribe(() => {
      this._router.navigate([ 'experiences-admin' ])
    })
  }

  protected readonly formExperiencesConfig = formExperiencesConfig;
}
