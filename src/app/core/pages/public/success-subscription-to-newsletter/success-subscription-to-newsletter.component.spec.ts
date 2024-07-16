import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessSubscriptionToNewsletterComponent } from './success-subscription-to-newsletter.component';

describe('SuccessSubscriptionToNewsletterComponent', () => {
  let component: SuccessSubscriptionToNewsletterComponent;
  let fixture: ComponentFixture<SuccessSubscriptionToNewsletterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SuccessSubscriptionToNewsletterComponent]
    });
    fixture = TestBed.createComponent(SuccessSubscriptionToNewsletterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
