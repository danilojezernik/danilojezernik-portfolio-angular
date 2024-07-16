import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSubscriberAdminComponent } from './edit-subscriber-admin.component';

describe('EditSubscriberAdminComponent', () => {
  let component: EditSubscriberAdminComponent;
  let fixture: ComponentFixture<EditSubscriberAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EditSubscriberAdminComponent]
    });
    fixture = TestBed.createComponent(EditSubscriberAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
