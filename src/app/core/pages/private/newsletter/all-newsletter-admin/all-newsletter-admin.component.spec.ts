import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllNewsletterAdminComponent } from './all-newsletter-admin.component';

describe('AllNewsletterAdminComponent', () => {
  let component: AllNewsletterAdminComponent;
  let fixture: ComponentFixture<AllNewsletterAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AllNewsletterAdminComponent]
    });
    fixture = TestBed.createComponent(AllNewsletterAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
