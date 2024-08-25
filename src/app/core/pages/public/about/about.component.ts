import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MyGalleryComponent} from "../../../../shared/components/my-gallery/my-gallery.component";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, MyGalleryComponent],
  templateUrl: './about.component.html'
})
export class AboutComponent {

}
