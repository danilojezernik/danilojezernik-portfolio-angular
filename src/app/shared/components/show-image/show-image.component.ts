import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-show-image',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './show-image.component.html'
})
export class ShowImageComponent {
  // URL or path to an image
  @Input() image?: string;
}
