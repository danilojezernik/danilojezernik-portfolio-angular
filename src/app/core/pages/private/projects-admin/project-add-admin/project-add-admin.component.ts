import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from "@angular/router";
import { FormFieldConfig } from "../../../../../models/form-field-config.model";
import { Validators } from "@angular/forms";
import { ProjectsService } from "../../../../../services/api/projects.service";
import { ReusableFormAddComponent } from "../../../../../shared/forms/reusable-form-add/reusable-form-add.component";
import { Projects } from "../../../../../models/projects";

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
   * formConfig defines the configuration for the form fields.
   * It is an array of FormFieldConfig objects, each specifying the name, label, type, and validators for a form field.
   */
  formConfig: FormFieldConfig[] = [
    { name: 'title', label: 'Naslov', type: 'text', validators: [ Validators.required ] }, // Form field for the project title, required
    { name: 'subtitle', label: 'Podnaslov', type: 'text', validators: [ Validators.required ] }, // Form field for the project subtitle, required
    { name: 'category', label: 'Kategorija', type: 'text', validators: [ Validators.required ] }, // Form field for the project category, required
    { name: 'content', label: 'Vsebina', type: 'text', validators: [ Validators.required, Validators.minLength(10) ] }, // Form field for the project content, required and with a minimum length
    { name: 'github', label: 'Github', type: 'text', validators: [ Validators.required ] }, // Form field for the project's GitHub URL, required
    { name: 'website', label: 'Website', type: 'text', validators: [ Validators.required ] } // Form field for the project's website URL, required
  ];

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
    this._projectsService.addProjectAdmin(formValidator).subscribe();
    // Navigate to the projects admin page after successful addition
    this._router.navigate([ 'projects-admin' ]);
  }

}
