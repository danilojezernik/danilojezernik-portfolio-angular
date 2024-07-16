import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewsletterAdminComponent } from './add-newsletter-admin.component';

describe('AddNewsletterAdminComponent', () => {
  let component: AddNewsletterAdminComponent;
  let fixture: ComponentFixture<AddNewsletterAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddNewsletterAdminComponent]
    });
    fixture = TestBed.createComponent(AddNewsletterAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
