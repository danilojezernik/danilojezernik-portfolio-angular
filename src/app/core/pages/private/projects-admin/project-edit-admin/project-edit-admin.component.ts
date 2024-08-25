import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsService } from "../../../../../services/api/projects.service";
import { ActivatedRoute, Router } from "@angular/router";
import { catchError, map, of } from "rxjs";
import { ShowDataComponent } from "../../../../../shared/components/show-data/show-data.component";
import { GoBackComponent } from "../../../../../shared/components/go-back/go-back.component";
import { ReusableFormEditComponent } from "../../../../../shared/forms/reusable-form-edit/reusable-form-edit.component";
import { formProjectsConfig } from "../../../../../shared/global-const/form-config";
import { TranslateService } from "@ngx-translate/core";
import { Projects } from "../../../../../models/projects";
import { LoadingComponent } from "../../../../../shared/components/loading/loading.component";
import {BreadcrumbAdminComponent} from "../../../../../shared/components/breadcrumb-admin/breadcrumb-admin.component";

/**
 * @Component ProjectEditAdminComponent
 * Represents the component responsible for editing a project post by ID in the admin interface.
 */

@Component({
  selector: 'app-project-edit-admin',
  standalone: true,
    imports: [CommonModule, ShowDataComponent, GoBackComponent, ReusableFormEditComponent, LoadingComponent, BreadcrumbAdminComponent],
  templateUrl: './project-edit-admin.component.html'
})
export class ProjectEditAdminComponent implements OnInit {

  private _projectService = inject(ProjectsService); // Injecting ProjectsService for project-related operations
  private _activatedRoute = inject(ActivatedRoute); // Provides access to route parameters
  private _router = inject(Router); // Helps navigate between routes
  private _translateService = inject(TranslateService); // Injecting TranslateService for translating error messages

  // Property to store error messages, initialized to null
  error: string | null = null;

  // Property to track loading state, initialized to false
  loading: boolean = false;

  // Object to hold the project data to be edited
  formData: any = {};

  /**
   * @method ngOnInit
   * Lifecycle hook that is called after Angular has initialized all data-bound properties.
   * Retrieves the project ID from the route parameters and fetches corresponding project data.
   */
  ngOnInit() {
    const projectId = this._activatedRoute.snapshot.paramMap.get('id') || '';

    // Show spinner while loading
    this.loading = true;

    // Fetch the project data using the ProjectsService based on the retrieved ID
    this._projectService.getProjectById(projectId).pipe(
      map(data => {
        this.formData = data; // Populate formData with fetched project data
        this.loading = false; // Hide spinner after loading
      }),
      catchError((error) => {
        this.loading = false; // Hide spinner after loading
        // Extract the error message
        const message = error.message;
        // Translate the error message using the Translation service and set it to the error property
        this._translateService.get(message).subscribe((translation) => {
          this.error = translation;
        });
        // Return an observable of an empty array to handle errors gracefully
        return of([] as Projects[]);
      })
    ).subscribe();
  }

  /**
   * @method editProject
   * Updates an existing project with new data and navigates to the admin project page upon success.
   *
   * @param formValue - The form data submitted by the user.
   */
  editProject(formValue: any) {
    // Show spinner while loading
    this.loading = true;

    const projectId = this._activatedRoute.snapshot.paramMap.get('id') || '';

    // Call the ProjectsService method to update the project post with new data
    this._projectService.editProjectByIdAdmin(projectId, formValue).subscribe(() => {
      // Hide spinner after loading
      this.loading = false;

      // Navigate the user back to the projects admin page after editing is complete
      this._router.navigate([ 'projects-admin' ]);
    }, (error) => {
      console.log('Error editing project: ', error);
      // Hide spinner after loading
      this.loading = false;
    });
  }

  /**
   * Form configuration for projects
   * Uses predefined formProjectsConfig from a global constant file
   */
  protected readonly formProjectsConfig = formProjectsConfig;
}
