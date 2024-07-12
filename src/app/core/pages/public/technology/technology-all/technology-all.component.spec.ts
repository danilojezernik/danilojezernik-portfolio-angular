import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnologyAllComponent } from './technology-all.component';

describe('TechnologyAllComponent', () => {
  let component: TechnologyAllComponent;
  let fixture: ComponentFixture<TechnologyAllComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TechnologyAllComponent]
    });
    fixture = TestBed.createComponent(TechnologyAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
