import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonAdminComponent } from './button-admin.component';

describe('ButtonAdminAddComponent', () => {
  let component: ButtonAdminComponent;
  let fixture: ComponentFixture<ButtonAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ ButtonAdminComponent ]
    });
    fixture = TestBed.createComponent(ButtonAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
