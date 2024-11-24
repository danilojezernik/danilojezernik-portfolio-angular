import {Component, inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {HeroTitleComponent} from "../../../../shared/components/hero-title/hero-title.component";
import {LearningService} from "../../../../services/api/learning.service";
import {LearningModel} from "../../../../models/learning.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-learning-path',
  standalone: true,
  imports: [CommonModule, HeroTitleComponent],
  templateUrl: './learning-path.component.html'
})
export class LearningPathComponent {

  private learningDataService = inject(LearningService)

  item: Observable<LearningModel[]>= this.learningDataService.getLearningData()

}
