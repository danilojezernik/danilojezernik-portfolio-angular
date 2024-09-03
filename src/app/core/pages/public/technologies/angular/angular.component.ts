import {
  Component,
  ElementRef,
  inject,
  ViewChild,
  ViewChildren,
  QueryList,
  AfterViewInit,
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AngularService} from "../../../../../services/api/angular.service";
import {OrderService} from "../../../../../utils/local-storage/order-service";
import {catchError, map, of} from "rxjs";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {Angular} from "../../../../../models/angular.model";
import {HeroTitleComponent} from "../../../../../shared/components/hero-title/hero-title.component";
import {BUTTONS} from "../../../../../shared/global-const/global.const";
import {LoadingComponent} from "../../../../../shared/components/loading/loading.component";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-angular',
  standalone: true,
  imports: [CommonModule, HeroTitleComponent, TranslateModule, LoadingComponent, RouterLink],
  templateUrl: './angular.component.html'
})
export class AngularComponent implements AfterViewInit {

  // Captures references to all elements with the template reference variable 'questionElement'
  @ViewChildren('questionElement') questionElements!: QueryList<ElementRef>;

  // Captures the reference to the drawer's close button using the template reference variable 'closeButton'
  @ViewChild('closeButton') closeButton!: ElementRef<HTMLButtonElement>;

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
    map(angular => this._orderService.applySavedBlogOrder(angular, 'angularOrder', '_id'))
  );

  // Open drawer functionality
  toggleDrawer() {
    this.drawerOpen = !this.drawerOpen;
  }

  ngAfterViewInit() {
    this.drawerOpen = false;  // Close drawer after view is initialized
  }

  /**
   * Scrolls to the question element with the specified ID and closes the drawer.
   * @param questionId - The ID of the question element to scroll to
   */
  scrollToQuestion(questionId?: string) {
    // Find the target element by matching the provided ID with the ID of the question elements
    const targetElement = this.questionElements.find((element) => element.nativeElement.id === questionId);
    if (targetElement) {
      // Scroll the target element into view with a smooth scroll effect
      targetElement.nativeElement.scrollIntoView({ behavior: 'smooth' });
      // Trigger a click on the close button to close the drawer

      // Close the drawer by clicking the close button
      if (this.closeButton) {
        this.closeButton.nativeElement.click()
        this.drawerOpen = false
      }
    }
  }

  // A constant reference to globally defined BUTTONS, used in the template for button rendering
  protected readonly BUTTONS = BUTTONS;
}
