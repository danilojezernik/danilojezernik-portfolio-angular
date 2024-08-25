import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreadcrumbAdminComponent } from './breadcrumb-admin.component';

describe('BreadcrumbAdminComponent', () => {
  let component: BreadcrumbAdminComponent;
  let fixture: ComponentFixture<BreadcrumbAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BreadcrumbAdminComponent]
    });
    fixture = TestBed.createComponent(BreadcrumbAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
