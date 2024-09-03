import { TestBed } from '@angular/core/testing';

import { ScrollToQuestionService } from './scroll-to-question.service';

describe('ScrollToQuestionService', () => {
  let service: ScrollToQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScrollToQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
