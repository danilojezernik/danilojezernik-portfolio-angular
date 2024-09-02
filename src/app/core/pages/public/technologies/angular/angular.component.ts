import {Component, ElementRef, inject, ViewChild, ViewChildren, QueryList} from '@angular/core';
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
export class AngularComponent {

  @ViewChildren('questionElement') questionElements!: QueryList<ElementRef>;
  @ViewChild('closeButton') closeButton!: ElementRef<HTMLButtonElement>;

  private _angularService = inject(AngularService)
  private _orderService = inject(OrderService)
  private _translateService = inject(TranslateService)

  // Property to store error messages, initialized to null
  error: string | null = null

  scrollToQuestion(questionId?: string) {
    const targetElement = this.questionElements.find((element) => element.nativeElement.id === questionId);
    if (targetElement) {
      targetElement.nativeElement.scrollIntoView({behavior: 'smooth'});
      // Trigger the close button click event to close the drawer
      this.closeButton.nativeElement.click();
    }
  }

  angular$ = this._angularService.getAllAngular().pipe(
    // 'catchError' is used to handle any errors that occur during the fetching process
    catchError((error) => {
      // Extract the error message
      const message = error.message
      // Translate the error message using the Translation service and set it to the error property
      this._translateService.get(message).subscribe((translation) => {
        this.error = translation
      })
      // Return an observable of an empty array to handle errors gracefully
      return of([] as Angular[])
    }),
    map(angular => this._orderService.applySavedBlogOrder(angular, 'angularOrder', '_id'))
  )

  protected readonly BUTTONS = BUTTONS;
}
