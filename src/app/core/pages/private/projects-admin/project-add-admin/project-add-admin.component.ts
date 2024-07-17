import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from "@angular/router";
import { ProjectsService } from "../../../../../services/api/projects.service";
import { ReusableFormAddComponent } from "../../../../../shared/forms/reusable-form-add/reusable-form-add.component";
import { Projects } from "../../../../../models/projects";
import { formProjectsConfig } from "../../../../../shared/global-const/form-config";
import { TranslateService } from "@ngx-translate/core";
import { of } from "rxjs";
import { GoBackComponent } from "../../../../../shared/components/go-back/go-back.component";
import { LoadingComponent } from "../../../../../shared/components/loading/loading.component";

/**
 * @Component ProjectAddAdminComponent
 * Component for adding new projects in the admin interface.
 */

@Component({
  selector: 'app-project-add-admin',
  standalone: true,
  imports: [ CommonModule, ReusableFormAddComponent, GoBackComponent, LoadingComponent ],
  templateUrl: './project-add-admin.component.html'
})
export class ProjectAddAdminComponent {

  // Injected instances: ProjectsService for managing project data, Router for navigation
  private _projectsService = inject(ProjectsService); // Injecting ProjectsService for managing project data
  private _router = inject(Router); // Injecting Router for navigating between routes
  private _translateService = inject(TranslateService); // Injecting TranslateService for translating error messages

  // Property to store error messages, initialized to null
  error: string | null = null;

  // Property to track loading state, initialized to false
  loading: boolean = false;

  /**
   * @method addNewProject
   * Method to add a new project based on form inputs.
   * Validates required fields and calls ProjectsService to add the new project.
   * Navigates back to the projects admin page after successful addition.
   *
   * @param formValidator - The form data to be validated and sent to the server for adding a new project.
   */
  addNewProject(formValidator: Projects) {
    // Show spinner while loading
    this.loading = true;

    // Call ProjectsService to add the new project
    this._projectsService.addProjectAdmin(formValidator).subscribe(() => {
      // Hide spinner after loading
      this.loading = false;

      // Navigate to the projects admin page after successful addition
      this._router.navigate([ 'projects-admin' ]);
    }, (error) => {
      // Hide spinner after loading
      this.loading = false;

      // Extract the error message
      const message = error.message;
      // Translate the error message using the Translation service and set it to the error property
      this._translateService.get(message).subscribe((translation) => {
        this.error = translation;
      });

      // Return an observable of an empty array to handle errors gracefully
      return of([] as Projects[]);
    })
  }

  /**
   * Form configuration for projects
   * Uses predefined formBlogConfig from a global constant file
   * */
  protected readonly formProjectsConfig = formProjectsConfig;
}
