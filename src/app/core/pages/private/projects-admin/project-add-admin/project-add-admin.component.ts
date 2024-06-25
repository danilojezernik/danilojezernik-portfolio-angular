import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from "@angular/router";
import { ProjectsService } from "../../../../../services/api/projects.service";
import { ReusableFormAddComponent } from "../../../../../shared/forms/reusable-form-add/reusable-form-add.component";
import { Projects } from "../../../../../models/projects";
import { formProjectsConfig } from "../../../../../shared/global-const/form-config";

/**
 * @Component ProjectAddAdminComponent
 * Component for adding new projects in the admin interface.
 */

@Component({
  selector: 'app-project-add-admin',
  standalone: true,
  imports: [ CommonModule, ReusableFormAddComponent ],
  templateUrl: './project-add-admin.component.html'
})
export class ProjectAddAdminComponent {

  // Injected instances: ProjectsService for managing project data, Router for navigation
  private _projectsService = inject(ProjectsService); // Injecting ProjectsService for managing project data
  private _router = inject(Router); // Injecting Router for navigating between routes

  /**
   * @method addNewProject
   * Method to add a new project based on form inputs.
   * Validates required fields and calls ProjectsService to add the new project.
   * Navigates back to the projects admin page after successful addition.
   *
   * @param formValidator - The form data to be validated and sent to the server for adding a new project.
   */
  addNewProject(formValidator: Projects) {
    // Call ProjectsService to add the new project
    this._projectsService.addProjectAdmin(formValidator).subscribe(() => {
      // Navigate to the projects admin page after successful addition
      this._router.navigate([ 'projects-admin' ]);
    })
  }

  /**
   * Form configuration for projects
   * Uses predefined formBlogConfig from a global constant file
   * */
  protected readonly formProjectsConfig = formProjectsConfig;
}
