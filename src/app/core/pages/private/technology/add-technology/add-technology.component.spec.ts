import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTechnologyComponent } from './add-technology.component';

describe('AddTechnologyTechnologyComponent', () => {
  let component: AddTechnologyComponent;
  let fixture: ComponentFixture<AddTechnologyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ AddTechnologyComponent ]
    });
    fixture = TestBed.createComponent(AddTechnologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
