import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnologyByIdComponent } from './technology-by-id.component';

describe('TechnologyByIdComponent', () => {
  let component: TechnologyByIdComponent;
  let fixture: ComponentFixture<TechnologyByIdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TechnologyByIdComponent]
    });
    fixture = TestBed.createComponent(TechnologyByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
