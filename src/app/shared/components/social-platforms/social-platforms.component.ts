import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-social-platforms',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './social-platforms.component.html'
})
export class SocialPlatformsComponent {

  @Input() facebook?: string
  @Input() instagram?: string
  @Input() twitter?: string
  @Input() youtube?: string
  @Input() github?: string
  @Input() www?: string

  // Number to set a size of the icon
  @Input() wh?: number = 6

  // Get the size of the width and height of the icon
  getSvgSize() {
    return `w-${this.wh} h-${this.wh}`;
  }
}
