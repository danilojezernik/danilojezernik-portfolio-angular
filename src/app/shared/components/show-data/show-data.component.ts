import {Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from "@angular/router";
import {ClipboardCopyService} from "../../../services/clipboard-copy/clipboard-copy.service";

/**
 * This component is for easy adding any kind of data inputs and displaying them.
 * It uses Angular standalone component feature and imports CommonModule for common directives.
 */

@Component({
  selector: 'app-show-data',
  standalone: true,
  imports: [ CommonModule, RouterLink ],
  templateUrl: './show-data.component.html'
})
export class ShowDataComponent {

  // Unique identifier for the data
  @Input() _id?: string;

  // General title or name of the data
  @Input() naslov?: string;

  // Category of the data
  @Input() kategorija?: string;

  // Subtitle or secondary title
  @Input() podnaslov?: string;

  // Main content or body of the data
  @Input() vsebina?: string;

  // Name of the image
  @Input() imageName?: string;

  // Date of entry or creation
  @Input() datum_vnosa?: string;

  // Generic title field
  @Input() title?: string;

  // Generic title field
  @Input() role?: string;

  // Technology stack
  @Input() stack?: string;

  // Framework being used
  @Input() framework?: string;

  // Programming language used
  @Input() programming_language?: string;

  // Company name
  @Input() company?: string;

  // Boolean indicating if the user is an employee
  @Input() employee?: boolean;

  // Description of tasks
  @Input() tasks?: string;

  // Start date at the company
  @Input() company_start?: string;

  // End date at the company
  @Input() company_end?: string;

  // Associated blog ID
  @Input() blog_id?: string;

  // Main content or body of the data
  @Input() content?: string;

  // Author of the data
  @Input() author?: string;

  // Person's name
  @Input() name?: string;

  // Person's surname
  @Input() surname?: string;

  // Person's email address
  @Input() email?: string;

  // Message content
  @Input() message?: string;

  // URL link
  @Input() link?: string;

  // Generic subtitle field
  @Input() subtitle?: string;

  // Category of the data
  @Input() category?: string;

  // URL to GitHub repository
  @Input() github?: string;

  // URL to a website
  @Input() website?: string;

  // Boolean indicating if the email is confirmed
  @Input() confirmed?: boolean;

  // Username of the user
  @Input() username?: string;

  // Full name of the user
  @Input() full_name?: string;

  // Profession of the user
  @Input() profession?: string;

  // Technology used or associated
  @Input() technology?: string;

  // Description or additional information
  @Input() description?: string;

  // Hashed password for security
  @Input() hashed_password?: string;

  // Boolean indicating if the user is registered
  @Input() registered?: boolean;

  // Boolean indicating if blog notifications are enabled
  @Input() blog_notification?: boolean;

  // Technology used or associated (alternate field)
  @Input() tehnologija?: string;

  // Inject services to copy image name to clipboard
  private _clipboardService = inject(ClipboardCopyService)


  copyToClipboard(img: string) {
    this._clipboardService.copyImageName(img)
  }
}
