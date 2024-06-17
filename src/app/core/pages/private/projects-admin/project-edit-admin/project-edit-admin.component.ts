import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsService } from "../../../../../services/api/projects.service";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { Projects } from "../../../../../models/projects";
import { ShowDataTestComponent } from "../../../../../shared/components/show-data-test/show-data-test.component";

@Component({
  selector: 'app-project-edit-admin',
  standalone: true,
  imports: [ CommonModule, ShowDataTestComponent ],
  templateUrl: './project-edit-admin.component.html'
})
export class ProjectEditAdminComponent implements OnInit {

  private _projectService = inject(ProjectsService)
  private router = inject(ActivatedRoute)

  project$!: Observable<Projects>


  ngOnInit() {
    const projectId = this.router.snapshot.paramMap.get('id') || ''


  }

  getProjectById(id: string) {
    this.project$ = this._projectService.getProjectById(id)
  }

}
