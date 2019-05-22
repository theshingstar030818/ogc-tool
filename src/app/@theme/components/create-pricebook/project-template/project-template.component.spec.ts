import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProjectTemplateComponent } from './project-template.component';

describe('DivisionComponent', () => {
  let component: CreateProjectTemplateComponent;
  let fixture: ComponentFixture<CreateProjectTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateProjectTemplateComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProjectTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
