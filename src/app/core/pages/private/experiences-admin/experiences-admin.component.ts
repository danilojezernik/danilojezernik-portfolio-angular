import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoBackComponent } from "../../../../shared/components/go-back/go-back.component";

@Component({
  selector: 'app-experiences-admin',
  standalone: true,
  imports: [ CommonModule, GoBackComponent ],
  templateUrl: './experiences-admin.component.html'
})
export class ExperiencesAdminComponent {

}
