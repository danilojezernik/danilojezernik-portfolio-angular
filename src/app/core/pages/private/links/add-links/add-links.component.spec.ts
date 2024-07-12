import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLinksComponent } from './add-links.component';

describe('AddLinksComponent', () => {
  let component: AddLinksComponent;
  let fixture: ComponentFixture<AddLinksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AddLinksComponent]
    });
    fixture = TestBed.createComponent(AddLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
