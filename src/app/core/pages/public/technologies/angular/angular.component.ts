import {
  Component,
  ElementRef,
  inject,
  ViewChildren,
  QueryList
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
import {ScrollToQuestionService} from "../../../../../services/scroll-to-question/scroll-to-question.service";

@Component({
  selector: 'app-angular',
  standalone: true,
  imports: [CommonModule, HeroTitleComponent, TranslateModule, LoadingComponent, RouterLink, ButtonPublicComponent],
  templateUrl: './angular.component.html'
})
export class AngularComponent {

  // Captures references to all elements with the template reference variable 'questionElement'
  @ViewChildren('questionElement') questionElements!: QueryList<ElementRef>;

  // Injecting AngularService to fetch Angular-related data
  private _angularService = inject(AngularService);

  // Injecting OrderService to manage and apply the order of the questions
  private _orderService = inject(OrderService);

  // Injecting TranslateService to handle translation of text and error messages
  private _translateService = inject(TranslateService);

  private _scrollToQuestionService = inject(ScrollToQuestionService)

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
    map(data => this._orderService.applySavedBlogOrder(data, 'angularOrder', '_id')),
  );

  // Open drawer functionality
  toggleDrawer() {
    this.drawerOpen = !this.drawerOpen;
  }

  /**
   * Scrolls to the question element with the specified ID and closes the drawer.
   * @param questionId - The ID of the question element to scroll to
   */
  scrollToQuestion(questionId?: string) {
    this._scrollToQuestionService.scrollToQuestion(questionId, this.questionElements, this.toggleDrawer.bind(this));
  }

}
