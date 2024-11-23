import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonPublicComponent} from "../../../../../shared/components/button-public/button-public.component";
import {HeroTitleComponent} from "../../../../../shared/components/hero-title/hero-title.component";
import {LoadingComponent} from "../../../../../shared/components/loading/loading.component";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {OrderService} from "../../../../../utils/local-storage/order-service";
import {catchError, map, of} from "rxjs";
import {VueService} from "../../../../../services/api/vue.service";
import {FaqListComponent} from "../../../../../shared/components/faq-list/faq-list.component";
import {Vue} from "../../../../../models/vue.model";

@Component({
  selector: 'app-vue',
  standalone: true,
  imports: [CommonModule, ButtonPublicComponent, HeroTitleComponent, LoadingComponent, TranslateModule, FaqListComponent],
  templateUrl: './vue.component.html'
})
export class VueComponent {

  // Injecting AngularService to fetch Angular-related data
  private _vueService = inject(VueService);

  // Injecting OrderService to manage and apply the order of the questions
  private _orderService = inject(OrderService);

  // Injecting TranslateService to handle translation of text and error messages
  private _translateService = inject(TranslateService);


  // Property to store error messages, initialized to null
  error: string | null = null;

  // Track drawer state
  drawerOpen = false;

  // Observable that fetches and processes the list of Angular questions
  vue$ = this._vueService.getAllVue().pipe(
    // 'catchError' is used to handle any errors that occur during the fetching process
    catchError((error) => {
      // Extract the error message from the caught error
      const message = error.message;
      // Translate the error message using the TranslateService and store it in the 'error' property
      this._translateService.get(message).subscribe((translation) => {
        this.error = translation;
      });
      // Return an observable of an empty array to gracefully handle errors in the pipeline
      return of([] as Vue[]);
    }),
    // Map the received Angular questions and apply any saved order using the OrderService
    map(data => this._orderService.applySavedOrder(data, 'vueOrder', '_id')),
  );

  // Open drawer functionality
  toggleDrawer() {
    this.drawerOpen = !this.drawerOpen;
  }

}
