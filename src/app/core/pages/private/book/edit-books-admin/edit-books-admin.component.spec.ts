import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBooksAdminComponent } from './edit-books-admin.component';

describe('EditBooksAdminComponent', () => {
  let component: EditBooksAdminComponent;
  let fixture: ComponentFixture<EditBooksAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [EditBooksAdminComponent]
    });
    fixture = TestBed.createComponent(EditBooksAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
