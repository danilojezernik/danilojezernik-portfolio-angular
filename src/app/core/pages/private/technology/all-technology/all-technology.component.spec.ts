import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTechnologyComponent } from './all-technology.component';

describe('AllTechnologyTechnologyComponent', () => {
  let component: AllTechnologyComponent;
  let fixture: ComponentFixture<AllTechnologyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ AllTechnologyComponent ]
    });
    fixture = TestBed.createComponent(AllTechnologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
