import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBooksAdminComponent } from './all-books-admin.component';

describe('AllBooksAdminComponent', () => {
  let component: AllBooksAdminComponent;
  let fixture: ComponentFixture<AllBooksAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [AllBooksAdminComponent]
    });
    fixture = TestBed.createComponent(AllBooksAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
