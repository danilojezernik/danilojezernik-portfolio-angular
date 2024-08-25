import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-breadcrumb-admin',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule],
  templateUrl: './breadcrumb-admin.component.html'
})
export class BreadcrumbAdminComponent {

  // First main
  @Input() first?: string
  @Input() firstLink?: string

  // Second after main
  @Input() second?: string
  @Input() secondLink?: string

  // Third add something
  @Input() third?: string
  @Input() thirdLink?: string

}
