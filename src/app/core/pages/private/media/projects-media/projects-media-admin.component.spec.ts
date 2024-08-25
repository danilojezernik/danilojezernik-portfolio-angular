import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectsMediaAdminComponent } from './projects-media-admin.component';

describe('ProjectsMediaComponent', () => {
  let component: ProjectsMediaAdminComponent;
  let fixture: ComponentFixture<ProjectsMediaAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ProjectsMediaAdminComponent]
    });
    fixture = TestBed.createComponent(ProjectsMediaAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
