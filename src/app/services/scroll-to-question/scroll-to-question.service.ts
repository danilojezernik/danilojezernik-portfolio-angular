import {ElementRef, Injectable, QueryList} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollToQuestionService {

  /**
   * Scrolls to the question element with the specified ID and optionally closes a drawer.
   * @param questionId - The ID of the question element to scroll to
   * @param questionElements - A QueryList of ElementRef representing the question elements
   * @param closeDrawerFn - A function to close the drawer, if needed
   */
  scrollToQuestion(questionId: string | undefined, questionElements: QueryList<ElementRef>, closeDrawerFn?: () => void) {
    const targetElement = questionElements.find((element) => element.nativeElement.id === questionId);
    if (targetElement) {
      targetElement.nativeElement.scrollIntoView({ behavior: 'smooth' });
      if (closeDrawerFn) {
        closeDrawerFn();
      }
    }
  }

}
