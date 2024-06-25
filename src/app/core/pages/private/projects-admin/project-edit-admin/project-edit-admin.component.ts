import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsService } from "../../../../../services/api/projects.service";
import { ActivatedRoute, Router } from "@angular/router";
import { map } from "rxjs";
import { ShowDataComponent } from "../../../../../shared/components/show-data/show-data.component";
import { GoBackComponent } from "../../../../../shared/components/go-back/go-back.component";
import { ReusableFormEditComponent } from "../../../../../shared/forms/reusable-form-edit/reusable-form-edit.component";
import { formProjectsConfig } from "../../../../../shared/global-const/form-config";

@Component({
  selector: 'app-project-edit-admin',
  standalone: true,
  imports: [ CommonModule, ShowDataComponent, GoBackComponent, ReusableFormEditComponent ],
  templateUrl: './project-edit-admin.component.html'
})
export class ProjectEditAdminComponent implements OnInit {

  private _projectService = inject(ProjectsService)
  private _activatedRoute = inject(ActivatedRoute)
  private _router = inject(Router)

  formData: any = {}

  ngOnInit() {
    const projectId = this._activatedRoute.snapshot.paramMap.get('id') || ''

    this._projectService.getProjectById(projectId).pipe(
      map(data => {
        this.formData = data
      })
    ).subscribe()
  }

  editProject(formValue: any) {
    const projectId = this._activatedRoute.snapshot.paramMap.get('id') || ''

    this._projectService.editProjectByIdAdmin(projectId, formValue).subscribe(() => {
      this._router.navigate([ 'projects-admin' ]);
    })
  }

  /**
   * Form configuration for projects
   * Uses predefined formBlogConfig from a global constant file
   * */
  protected readonly formProjectsConfig = formProjectsConfig;
}
