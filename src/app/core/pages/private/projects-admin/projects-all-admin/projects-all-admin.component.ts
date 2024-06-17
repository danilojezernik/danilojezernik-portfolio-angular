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

@Component({
  selector: 'app-projects-admin',
  standalone: true,
  imports: [ CommonModule, GoBackComponent, ShowDataTestComponent, RouterLink, MatDialogModule ],
  templateUrl: './projects-all-admin.component.html'
})
export class ProjectsAllAdminComponent {

  private _projectService = inject(ProjectsService)
  public dialog = inject(MatDialog)

  projects$ = this._projectService.getAllProjectsAdmin()

  openDialog() {
    this.projects$.subscribe(data => {
      this.dialog.open(DialogGlobalAdminComponent, {
        data: {
          title: 'Projects Admin',
          allData: data
        },
        width: '300px',
        height: '300px',
      })
    })
  }
}
