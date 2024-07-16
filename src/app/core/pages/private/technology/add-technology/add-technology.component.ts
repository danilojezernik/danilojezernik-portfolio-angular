import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { formTechnologyConfig } from "../../../../../shared/global-const/form-config";
import { ReusableFormAddComponent } from "../../../../../shared/forms/reusable-form-add/reusable-form-add.component";
import { TranslateModule } from "@ngx-translate/core";
import { TechnologyService } from "../../../../../services/api/technology.service";
import { Router } from "@angular/router";
import { Technology } from "../../../../../models/technology";

@Component({
  selector: 'app-add-technology-technology',
  standalone: true,
  imports: [ CommonModule, ReusableFormAddComponent, TranslateModule ],
  templateUrl: './add-technology.component.html'
})
export class AddTechnologyComponent {

  private _technologyService = inject(TechnologyService)
  private _router = inject(Router)

  addTechnology(formValidator: Technology) {
    console.log(formValidator)
    this._technologyService.addTechnology(formValidator).subscribe(() => {
      this._router.navigate([ 'technology-admin' ])
    })
  }

  protected readonly formTechnologyConfig = formTechnologyConfig;
}
