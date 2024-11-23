import {
  Component,
  inject
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AngularService} from "../../../../../services/api/angular.service";
import {OrderService} from "../../../../../utils/local-storage/order-service";
import {catchError, map, of} from "rxjs";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {Angular} from "../../../../../models/angular.model";
import {HeroTitleComponent} from "../../../../../shared/components/hero-title/hero-title.component";
import {LoadingComponent} from "../../../../../shared/components/loading/loading.component";
import {RouterLink} from "@angular/router";
import {ButtonPublicComponent} from "../../../../../shared/components/button-public/button-public.component";
import {FaqListComponent} from "../../../../../shared/components/faq-list/faq-list.component";

@Component({
  selector: 'app-angular',
  standalone: true,
  imports: [CommonModule, HeroTitleComponent, TranslateModule, LoadingComponent, RouterLink, ButtonPublicComponent, FaqListComponent],
  templateUrl: './angular.component.html'
})
export class AngularComponent {

  // Injecting AngularService to fetch Angular-related data
  private _angularService = inject(AngularService);

  // Injecting OrderService to manage and apply the order of the questions
  private _orderService = inject(OrderService);

  // Injecting TranslateService to handle translation of text and error messages
  private _translateService = inject(TranslateService);

  // Property to store error messages, initialized to null
  error: string | null = null;

  // Track drawer state
  drawerOpen = false;

  // Observable that fetches and processes the list of Angular questions
  angular$ = this._angularService.getAllAngular().pipe(
  // 'catchError' is used to handle any errors that occur during the fetching process
    catchError((error) => {
      // Extract the error message from the caught error
      const message = error.message;
      // Translate the error message using the TranslateService and store it in the 'error' property
      this._translateService.get(message).subscribe((translation) => {
        this.error = translation;
      });
      // Return an observable of an empty array to gracefully handle errors in the pipeline
      return of([] as Angular[]);
    }),
    // Map the received Angular questions and apply any saved order using the OrderService
    map(data => this._orderService.applySavedOrder(data, 'angularOrder', '_id'))
  );

  // Open drawer functionality
  toggleDrawer() {
    this.drawerOpen = !this.drawerOpen;
  }

}
