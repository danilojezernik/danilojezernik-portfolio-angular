import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogAllComponent } from './blog-all.component';

describe('BlogAllComponent', () => {
  let component: BlogAllComponent;
  let fixture: ComponentFixture<BlogAllComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BlogAllComponent]
    });
    fixture = TestBed.createComponent(BlogAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
