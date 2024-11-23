import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {OrderService} from "../../../../../utils/local-storage/order-service";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {catchError, map, of} from "rxjs";
import {MongodbService} from "../../../../../services/api/mongodb.service";
import {ButtonPublicComponent} from "../../../../../shared/components/button-public/button-public.component";
import {HeroTitleComponent} from "../../../../../shared/components/hero-title/hero-title.component";
import {LoadingComponent} from "../../../../../shared/components/loading/loading.component";
import {FaqListComponent} from "../../../../../shared/components/faq-list/faq-list.component";
import {MongoDb} from "../../../../../models/mongodb.model";

@Component({
  selector: 'app-mongodb',
  standalone: true,
  imports: [CommonModule, ButtonPublicComponent, HeroTitleComponent, LoadingComponent, TranslateModule, FaqListComponent],
  templateUrl: './mongodb.component.html'
})
export class MongodbComponent {

  // Injecting AngularService to fetch Angular-related data
  private _mongodbService = inject(MongodbService);

  // Injecting OrderService to manage and apply the order of the questions
  private _orderService = inject(OrderService);

  // Injecting TranslateService to handle translation of text and error messages
  private _translateService = inject(TranslateService);

  // Property to store error messages, initialized to null
  error: string | null = null;

  // Track drawer state
  drawerOpen = false;

  // Observable that fetches and processes the list of Angular questions
  mongodb$ = this._mongodbService.getAllMongoDb().pipe(
    // 'catchError' is used to handle any errors that occur during the fetching process
    catchError((error) => {
      // Extract the error message from the caught error
      const message = error.message;
      // Translate the error message using the TranslateService and store it in the 'error' property
      this._translateService.get(message).subscribe((translation) => {
        this.error = translation;
      });
      // Return an observable of an empty array to gracefully handle errors in the pipeline
      return of([] as MongoDb[]);
    }),
    // Map the received Angular questions and apply any saved order using the OrderService
    map(data => this._orderService.applySavedOrder(data, 'mongodbOrder', '_id')),
  );

  // Open drawer functionality
  toggleDrawer() {
    this.drawerOpen = !this.drawerOpen;
  }

}
