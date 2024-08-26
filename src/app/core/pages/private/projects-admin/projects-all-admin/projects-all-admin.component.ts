import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoBackComponent } from "../../../../../shared/components/go-back/go-back.component";
import { ProjectsService } from "../../../../../services/api/projects.service";
import { ShowDataComponent } from "../../../../../shared/components/show-data/show-data.component";
import { RouterLink } from "@angular/router";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { BehaviorSubject, catchError, finalize, Observable, of } from "rxjs";
import { Projects } from "../../../../../models/projects";
import { ButtonAdminComponent } from "../../../../../shared/components/button-admin/button-admin.component";
import { TranslateService } from "@ngx-translate/core";
import { openDialogUtil } from "../../../../../utils/open-dialog.util";
import { LoadingComponent } from "../../../../../shared/components/loading/loading.component";
import {BreadcrumbAdminComponent} from "../../../../../shared/components/breadcrumb-admin/breadcrumb-admin.component";
import {GetImageService} from "../../../../../services/get-image/get-image.service";
import {ShowImageComponent} from "../../../../../shared/components/show-image/show-image.component";

/**
 * @Component ProjectsAllAdminComponent
 * Component for managing project administration.
 * Displays a list of projects and allows viewing and deleting individual project posts.
 */

@Component({
  selector: 'app-projects-admin',
  standalone: true,
  imports: [CommonModule, GoBackComponent, ShowDataComponent, RouterLink, MatDialogModule, ButtonAdminComponent, LoadingComponent, BreadcrumbAdminComponent, ShowImageComponent],
  templateUrl: './projects-all-admin.component.html'
})
export class ProjectsAllAdminComponent {

  // Inject ProjectsService instance for interacting with project data
  private _projectService = inject(ProjectsService);
  // Inject MatDialog instance for displaying dialogs
  private _dialog = inject(MatDialog);
  private _translateService = inject(TranslateService); // Injected TranslateService instance for translations
  protected _getImageByName = inject(GetImageService)

  // Property to store error messages, initialized to null
  error: string | null = null
  // Property to track loading state, initialized to false
  loading: boolean = false

  private _projectSubject = new BehaviorSubject<Projects[]>([]);

  // Observable holding all projects retrieved from the service
  projects$ = this._projectSubject.asObservable();

  // Observable holding project details for a specific project ID
  projectById$!: Observable<Projects>;

  constructor() {
    this.getAllProjects()
  }

  getAllProjects() {
    this.loading = true; // Set loading state to true before making the API call

    this._projectService.getAllProjectsAdmin().pipe(
      // Handle any errors that occur during the fetching process
      catchError((error) => {
        // Extract and translate the error message, then set it to the error property
        const message = error.message
        this._translateService.get(message).subscribe((translation) => {
          this.error = translation
        })
        // Return an observable of an empty array to handle errors gracefully
        return of([] as Projects[])
      }),
      // Ensure loading state is set to false once the API call is complete
      finalize(() => this.loading = false)
    ).subscribe(project => {
      this.loading = false; // Set loading state to false after receiving the response
      this._projectSubject.next(project); // Update the BehaviorSubject with the fetched blogs
    })
  }

  /**
   * Retrieves project details based on the provided ID.
   * @param id - ID of the project to retrieve
   */
  getProjectById(id: string) {
    this.projectById$ = this._projectService.getProjectById(id);
  }

  deleteProject(id?: string) {
    if (id) {
      this._projectService.deleteProjectByIdAdmin(id).subscribe(() => {
        this.getAllProjects()
      })
    }
  }

  /**
   * Opens a dialog displaying project details for a given project ID.
   * @param id - ID of the project to display in the dialog
   */
  openDialog(id?: string) {
    if (id) {
      this.projectById$ = this._projectService.getProjectById(id); // Fetch project post details by ID
      openDialogUtil(this._dialog, id, this.getProjectById.bind(this), this.projectById$, 'title', 'project'); // Open dialog with fetched data
    }
  }
}
