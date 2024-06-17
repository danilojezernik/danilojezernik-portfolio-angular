import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsService } from "../../../../services/api/projects.service";

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './projects.component.html'
})
export class ProjectsComponent {

  _projectService = inject(ProjectsService)

  projects$ = this._projectService.getAllProjects()

}
