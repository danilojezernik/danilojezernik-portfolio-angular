import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoBackComponent } from "../../../../../shared/components/go-back/go-back.component";
import { ProjectsService } from "../../../../../services/api/projects.service";
import { ShowDataTestComponent } from "../../../../../shared/components/show-data-test/show-data-test.component";
import { RouterLink } from "@angular/router";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import {
  DialogGlobalAdminComponent
} from "../../../../../shared/components/dialogs/dialog-global-admin/dialog-global-admin.component";
import { Observable } from "rxjs";
import { Projects } from "../../../../../models/projects";
import { DIALOG_DIMENSIONS } from "../../../../../shared/global-const/global.const";

/**
 * Component for managing all projects in the admin interface.
 */
@Component({
  selector: 'app-projects-admin',
  standalone: true, // This component is standalone, not requiring external bindings
  imports: [ CommonModule, GoBackComponent, ShowDataTestComponent, RouterLink, MatDialogModule ], // Import necessary Angular modules
  templateUrl: './projects-all-admin.component.html' // Template file for this component
})
export class ProjectsAllAdminComponent {

  // Inject ProjectsService instance for interacting with project data
  private _projectService = inject(ProjectsService);

  // Inject MatDialog instance for displaying dialogs
  public dialog = inject(MatDialog);

  // Observable holding all projects retrieved from the service
  projects$ = this._projectService.getAllProjectsAdmin();

  // Observable holding project details for a specific project ID
  projectById$!: Observable<Projects>;

  /**
   * Retrieves project details based on the provided ID.
   * @param id - ID of the project to retrieve
   */
  getProjectById(id: string) {
    this.projectById$ = this._projectService.getProjectById(id);
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
}
