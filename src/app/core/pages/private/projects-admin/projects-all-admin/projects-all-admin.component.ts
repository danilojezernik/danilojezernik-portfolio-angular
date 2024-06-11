import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoBackComponent } from "../../../../../shared/components/go-back/go-back.component";

@Component({
  selector: 'app-projects-admin',
  standalone: true,
  imports: [ CommonModule, GoBackComponent ],
  templateUrl: './projects-all-admin.component.html'
})
export class ProjectsAllAdminComponent {

}
