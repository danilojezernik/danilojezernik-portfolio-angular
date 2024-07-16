import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSubscriberAdminComponent } from './all-subscriber-admin.component';

describe('AllSubscriberAdminComponent', () => {
  let component: AllSubscriberAdminComponent;
  let fixture: ComponentFixture<AllSubscriberAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AllSubscriberAdminComponent]
    });
    fixture = TestBed.createComponent(AllSubscriberAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
