import {Component, ElementRef, EventEmitter, Input, Output, QueryList, ViewChildren} from '@angular/core';
import { CommonModule } from '@angular/common';
import {TranslateModule} from "@ngx-translate/core";
import {ButtonPublicComponent} from "../button-public/button-public.component";
import {LoadingComponent} from "../loading/loading.component";

@Component({
  selector: 'app-faq-list',
  standalone: true,
  imports: [CommonModule, TranslateModule, ButtonPublicComponent, LoadingComponent],
  templateUrl: './faq-list.component.html'
})
export class FaqListComponent {

  @Input() questions: any[] | null = null;
  @Input() error: string | null = null;
  @Input() drawerOpen: boolean = false;

  @Output() drawerToggle = new EventEmitter<void>();
  @Output() questionSelected = new EventEmitter<string>();

  @ViewChildren('questionElement') questionElements!: QueryList<ElementRef>;

  // Method to emit the selected question ID
  onQuestionSelected(questionId: string) {
    this.scrollToQuestion(questionId);
    this.drawerToggle.emit();
  }

  scrollToQuestion(questionId: string) {
    if (!questionId) return;

    const questionElement = this.questionElements.find(
      (element) => element.nativeElement.id === questionId
    );
    if (questionElement) {
      questionElement.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
