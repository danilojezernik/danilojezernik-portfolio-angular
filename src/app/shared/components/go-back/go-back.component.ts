import {Component, inject, Input} from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { TranslateModule } from "@ngx-translate/core";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-go-back',
  standalone: true,
  imports: [CommonModule, TranslateModule, RouterLink],
  templateUrl: './go-back.component.html'
})
export class GoBackComponent {

// Injecting Location service to handle navigation back
  _back = inject(Location)

  // Input properties to conditionally display buttons based on the admin section being viewed

  // Show button if in books admin
  @Input() booksAdmin?: boolean

  // Show button if in blogs admin
  @Input() blogsAdmin?: boolean

  // Show button if in projects admin
  @Input() projectsAdmin?: boolean

  // Show button if in books media admin section
  @Input() booksMediaAdmin?: boolean

  // Show button if in blogs media admin section
  @Input() blogsMediaAdmin?: boolean

  // Show button if in projects media admin section
  @Input() projectsMediaAdmin?: boolean

  // Show button if viewing a public blog by ID
  @Input() blogByIdPublic?: boolean

  // Method to navigate back to the previous page
  goBack() {
    this._back.back()
  }

}
