import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoBackComponent } from "../../../../../shared/components/go-back/go-back.component";
import { ProjectsService } from "../../../../../services/api/projects.service";
import { ShowDataComponent } from "../../../../../shared/components/show-data/show-data.component";
import { RouterLink } from "@angular/router";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import {
  DialogGlobalAdminComponent
} from "../../../../../shared/components/dialogs/dialog-global-admin/dialog-global-admin.component";
import { Observable } from "rxjs";
import { Projects } from "../../../../../models/projects";
import { BUTTONS, DIALOG_DIMENSIONS } from "../../../../../shared/global-const/global.const";

/**
 * Component for managing all projects in the admin interface.
 */
@Component({
  selector: 'app-projects-admin',
  standalone: true, // This component is standalone, not requiring external bindings
  imports: [ CommonModule, GoBackComponent, ShowDataComponent, RouterLink, MatDialogModule ], // Import necessary Angular modules
  templateUrl: './projects-all-admin.component.html' // Template file for this component
})
export class ProjectsAllAdminComponent implements OnInit {

  // Inject ProjectsService instance for interacting with project data
  private _projectService = inject(ProjectsService);

  // Inject MatDialog instance for displaying dialogs
  public dialog = inject(MatDialog);

  // Observable holding all projects retrieved from the service
  projects$!: Observable<Projects[]>

  // Observable holding project details for a specific project ID
  projectById$!: Observable<Projects>;

  ngOnInit() {
    this.getAllProjects()
  }

  getAllProjects() {
    this.projects$ = this._projectService.getAllProjectsAdmin()
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
      }, (error) => {
        console.error('Failed to delete project:', error); // Log error message if deletion fails
      })
    } else {
      console.error('Project by id doesn\'t exist'); // Log error if ID is undefined
    }
  }

  /**
   * Opens a dialog displaying project details for a given project ID.
   * @param id - ID of the project to display in the dialog
   */
  openDialog(id?: string) {
    if (id) {
      // Fetch project details based on ID
      this.getProjectById(id);

      // Subscribe to the projectById$ observable to get data once available
      this.projectById$.subscribe(data => {
        // Open MatDialog with specified parameters
        this.dialog.open(DialogGlobalAdminComponent, {
          data: {
            title: 'Projects Admin',
            allData: data
          },
          ...DIALOG_DIMENSIONS.admin
        });
      });
    } else {
      // Log error if ID is not provided
      console.error('Id doesn\'t exist');
    }
  }

  protected readonly BUTTONS = BUTTONS;
}
