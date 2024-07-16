import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExperiencesService } from "../../../../services/api/experiences.service";
import { map } from "rxjs";
import { LoadingComponent } from "../../../../shared/components/loading/loading.component";

@Component({
  selector: 'app-experiences',
  standalone: true,
  imports: [ CommonModule, LoadingComponent ],
  templateUrl: './experiences.component.html'
})
export class ExperiencesComponent {

  _experiencesService = inject(ExperiencesService)

  experiences$ = this._experiencesService.getAllExperiences().pipe(
    map(data => data.map(data => ({
        ...data,
        company_end: data.company_end ? data.company_end : 'Trenutno zaposlen',
      }))
    )
  )
}
