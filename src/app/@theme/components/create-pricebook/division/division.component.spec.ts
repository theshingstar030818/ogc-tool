import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDivisionComponent } from './division.component';

describe('DivisionComponent', () => {
  let component: CreateDivisionComponent;
  let fixture: ComponentFixture<CreateDivisionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDivisionComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDivisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
