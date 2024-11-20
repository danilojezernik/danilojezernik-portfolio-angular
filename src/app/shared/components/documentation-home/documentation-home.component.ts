import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-documentation-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './documentation-home.component.html'
})
export class DocumentationHomeComponent {

}
