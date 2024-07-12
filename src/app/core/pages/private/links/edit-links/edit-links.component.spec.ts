import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLinksComponent } from './edit-links.component';

describe('EditLinksComponent', () => {
  let component: EditLinksComponent;
  let fixture: ComponentFixture<EditLinksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EditLinksComponent]
    });
    fixture = TestBed.createComponent(EditLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
