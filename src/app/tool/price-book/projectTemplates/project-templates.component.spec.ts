import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectTemplatesComponent } from './project-templates.component';

describe('ProjectTemplatesComponent', () => {
  let component: ProjectTemplatesComponent;
  let fixture: ComponentFixture<ProjectTemplatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectTemplatesComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
