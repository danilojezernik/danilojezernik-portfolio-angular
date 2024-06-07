import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import { GoBackComponent } from "../../../../shared/components/go-back/go-back.component";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [ CommonModule, RouterLink, GoBackComponent ],
  templateUrl: './admin.component.html'
})
export class AdminComponent {

}
