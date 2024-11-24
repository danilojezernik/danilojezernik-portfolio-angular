import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsService } from "../../../../services/api/projects.service";
import { TranslateService } from "@ngx-translate/core";
import {catchError, map, of} from "rxjs";
import { Projects } from "../../../../models/projects";
import { LoadingComponent } from "../../../../shared/components/loading/loading.component";
import {OrderService} from "../../../../utils/local-storage/order-service";
import {HeroTitleComponent} from "../../../../shared/components/hero-title/hero-title.component";
import {GetImageService} from "../../../../services/get-image/get-image.service";
import {SlovenianDateTransformPipe} from "../../../../pipes/date-transform/slovenian-date-transform.pipe";

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, LoadingComponent, HeroTitleComponent, SlovenianDateTransformPipe],
  templateUrl: './projects.component.html'
})
export class ProjectsComponent {

  private _projectService = inject(ProjectsService)
  private _translateService = inject(TranslateService)
  protected _getImageByName = inject(GetImageService)

  // Injecting OrderService to manage and apply the order of the questions
  private _orderService = inject(OrderService);

  // Property to store error messages, initialized to null
  error: string | null = null

  projects$ = this._projectService.getAllProjects().pipe(
    // 'catchError' is used to handle any errors that occur during the fetching process
    catchError((error) => {
      // Extract the error message
      const message = error.message
      // Translate the error message using the Translation service and set it to the error property
      this._translateService.get(message).subscribe((translation) => {
        this.error = translation
      })
      // Return an observable of an empty array to handle errors gracefully
      return of([] as Projects[])
    }),
    // Map the received Angular questions and apply any saved order using the OrderService
    map(data => this._orderService.applySavedOrder(data, 'projectsOrder', '_id'))
  )

}
