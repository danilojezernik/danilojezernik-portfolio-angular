import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinksService } from "../../../../services/api/links.service";
import { TranslateService } from "@ngx-translate/core";
import { catchError, of } from "rxjs";
import { Links } from "../../../../models/links";
import { LoadingComponent } from "../../../../shared/components/loading/loading.component";

@Component({
  selector: 'app-links',
  standalone: true,
  imports: [ CommonModule, LoadingComponent ],
  templateUrl: './links.component.html'
})
export class LinksComponent {

  private _linksService = inject(LinksService)
  private _translateService = inject(TranslateService)

  // Property to store error messages, initialized to null
  error: string | null = null

  links$ = this._linksService.getAllLinks().pipe(
    // 'catchError' is used to handle any errors that occur during the fetching process
    catchError((error) => {
      // Extract the error message
      const message = error.message
      // Translate the error message using the Translation service and set it to the error property
      this._translateService.get(message).subscribe((translation) => {
        this.error = translation
      })
      // Return an observable of an empty array to handle errors gracefully
      return of([] as Links[])
    })
  )

}
