import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {DevApiService} from "../../../../../services/api/dev-api.service";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {catchError, Observable, of} from "rxjs";
import {DevToArticle} from "../../../../../models/dev-api";
import {HeroTitleComponent} from "../../../../../shared/components/hero-title/hero-title.component";
import {LoadingComponent} from "../../../../../shared/components/loading/loading.component";
import {ShorteningTextPipe} from "../../../../../pipes/shortening-text/shortening-text.pipe";

@Component({
  selector: 'app-dev-vue',
  standalone: true,
  imports: [CommonModule, HeroTitleComponent, LoadingComponent, ShorteningTextPipe, TranslateModule],
  templateUrl: './dev-vue.component.html'
})
export class DevVueComponent {

  private _devService = inject(DevApiService)
  private _translateService = inject(TranslateService)

  // Property to store error messages, initialized to null
  error: string | null = null
  vueDev$: Observable<DevToArticle[]> = this._devService.getArticlesDevVue().pipe(
    // 'catchError' is used to handle any errors that occur during the fetching process
    catchError((error) => {
      // Extract the error message
      const message = error.message
      // Translate the error message using the Translation service and set it to the error property
      this._translateService.get(message).subscribe((translation) => {
        this.error = translation
      })
      // Return an observable of an empty array and length of 0 to handle errors gracefully
      return of([] as DevToArticle[])
    })
  );
}
