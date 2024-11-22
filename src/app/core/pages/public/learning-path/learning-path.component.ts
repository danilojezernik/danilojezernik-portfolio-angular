import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeroTitleComponent} from "../../../../shared/components/hero-title/hero-title.component";

@Component({
  selector: 'app-learning-path',
  standalone: true,
  imports: [CommonModule, HeroTitleComponent],
  templateUrl: './learning-path.component.html'
})
export class LearningPathComponent {

}
