import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditNewsletterAdminComponent } from './edit-newsletter-admin.component';

describe('EditNewsletterAdminComponent', () => {
  let component: EditNewsletterAdminComponent;
  let fixture: ComponentFixture<EditNewsletterAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EditNewsletterAdminComponent]
    });
    fixture = TestBed.createComponent(EditNewsletterAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
