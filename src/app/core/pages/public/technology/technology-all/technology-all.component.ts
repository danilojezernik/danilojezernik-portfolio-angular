import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechnologyService } from "../../../../../services/api/technology.service";
import { catchError, Observable, of } from "rxjs";
import { Technology } from "../../../../../models/technology";
import { LoadingComponent } from "../../../../../shared/components/loading/loading.component";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-technology-all',
  standalone: true,
  imports: [ CommonModule, LoadingComponent ],
  templateUrl: './technology-all.component.html'
})
export class TechnologyAllComponent {

  private _technologyService = inject(TechnologyService)
  private _translateService = inject(TranslateService)

  // Property to store error messages, initialized to null
  error: string | null = null

  technology$: Observable<Technology[]> = this._technologyService.getAllTechnology().pipe(
    // 'catchError' is used to handle any errors that occur during the fetching process
    catchError((error) => {
      // Extract the error message
      const message = error.message
      // Translate the error message using the Translation service and set it to the error property
      this._translateService.get(message).subscribe((translation) => {
        this.error = translation
      })
      // Return an observable of an empty array to handle errors gracefully
      return of([] as Technology[])
    })
  )
}
