import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brands.component.html'
})
export class BrandsComponent {

  @Input() angular?: boolean
  @Input() tailwind?: boolean
  @Input() mongodb?: boolean
  @Input() python?: boolean
  @Input() docker?: boolean

  // Number to set a size of the icon
  @Input() wh?: number = 10

  // Get the size of the width and height of the icon
  getSvgSize() {
    return `w-${this.wh} h-${this.wh}`;
  }
}
