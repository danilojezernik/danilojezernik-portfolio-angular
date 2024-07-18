import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechnologyService } from "../../../../../services/api/technology.service";
import { ActivatedRoute } from "@angular/router";
import { catchError, Observable, of } from "rxjs";
import { Technology } from "../../../../../models/technology";
import { TranslateService } from "@ngx-translate/core";
import { LoadingComponent } from "../../../../../shared/components/loading/loading.component";

@Component({
  selector: 'app-technology-by-id',
  standalone: true,
  imports: [ CommonModule, LoadingComponent ],
  templateUrl: './technology-by-id.component.html'
})
export class TechnologyByIdComponent implements OnInit {

  private _technologyService = inject(TechnologyService)
  private _activatedRouter = inject(ActivatedRoute)
  private _translateService = inject(TranslateService)

  // Property to store error messages, initialized to null
  error: string | null = null

  technology$!: Observable<Technology>

  ngOnInit() {
    const technologyId = this._activatedRouter.snapshot.paramMap.get('id') || ''

    if (technologyId)
      this.getTechnologyById(technologyId)
  }

  getTechnologyById(technologyId: string) {
    this.technology$ = this._technologyService.getTechnologyById(technologyId).pipe(
      // 'catchError' is used to handle any errors that occur during the fetching process
      catchError((error) => {
        // Extract the error message
        const message = error.message
        // Translate the error message using the Translation service and set it to the error property
        this._translateService.get(message).subscribe((translation) => {
          this.error = translation
        })
        // Return an observable of an empty array to handle errors gracefully
        return of({} as Technology)
      })
    )
  }

}
