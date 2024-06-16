import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoBackComponent } from "../../../../shared/components/go-back/go-back.component";
import { ExperiencesService } from "../../../../services/api/experiences.service";
import { ShowDataTestComponent } from "../../../../shared/components/show-data-test/show-data-test.component";

@Component({
  selector: 'app-experiences-admin',
  standalone: true,
  imports: [ CommonModule, GoBackComponent, ShowDataTestComponent ],
  templateUrl: './experiences-admin.component.html'
})
export class ExperiencesAdminComponent {

  private _experiencesService = inject(ExperiencesService)

  experiences$ = this._experiencesService.getAllExperiencesAdmin()

}
