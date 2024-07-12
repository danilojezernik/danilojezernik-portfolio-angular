import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTechnologyComponent } from './edit-technology.component';

describe('EditTechnologyTechnologyComponent', () => {
  let component: EditTechnologyComponent;
  let fixture: ComponentFixture<EditTechnologyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ EditTechnologyComponent ]
    });
    fixture = TestBed.createComponent(EditTechnologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
