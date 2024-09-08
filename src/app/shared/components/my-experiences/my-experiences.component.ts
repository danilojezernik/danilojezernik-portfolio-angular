import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoadingComponent} from "../loading/loading.component";
import {ExperiencesService} from "../../../services/api/experiences.service";
import {TranslateService} from "@ngx-translate/core";
import {OrderService} from "../../../utils/local-storage/order-service";
import {catchError, map, of} from "rxjs";
import {Experiences} from "../../../models/experiences";
import {HeroTitleComponent} from "../hero-title/hero-title.component";

@Component({
  selector: 'app-my-experiences',
  standalone: true,
  imports: [CommonModule, LoadingComponent, HeroTitleComponent],
  templateUrl: './my-experiences.component.html'
})
export class MyExperiencesComponent {

  private _experiencesService = inject(ExperiencesService)
  private _translateService = inject(TranslateService)

  // Injecting OrderService to manage and apply the order of the questions
  private _orderService = inject(OrderService);

  // Property to store error messages, initialized to null
  error: string | null = null

  experiences$ = this._experiencesService.getAllExperiences().pipe(
    map(data => data.map(data => ({
        ...data,
        company_end: data.company_end ? data.company_end : 'Trenutno zaposlen',
      }))
    ),
    // 'catchError' is used to handle any errors that occur during the fetching process
    catchError((error) => {
      // Extract the error message
      const message = error.message
      // Translate the error message using the Translation service and set it to the error property
      this._translateService.get(message).subscribe((translation) => {
        this.error = translation
      })
      // Return an observable of an empty array to handle errors gracefully
      return of([] as Experiences[])
    }),
    // Map the received Angular questions and apply any saved order using the OrderService
    map(data => this._orderService.applySavedOrder(data, 'experiencesOrder', '_id'))
  )
}
