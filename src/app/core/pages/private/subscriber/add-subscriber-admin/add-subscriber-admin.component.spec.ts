import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubscriberAdminComponent } from './add-subscriber-admin.component';

describe('AddSubscriberAdminComponent', () => {
  let component: AddSubscriberAdminComponent;
  let fixture: ComponentFixture<AddSubscriberAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddSubscriberAdminComponent]
    });
    fixture = TestBed.createComponent(AddSubscriberAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
