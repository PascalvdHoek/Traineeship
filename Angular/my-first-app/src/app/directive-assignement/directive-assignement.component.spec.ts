import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectiveAssignementComponent } from './directive-assignement.component';

describe('DirectiveAssignementComponent', () => {
  let component: DirectiveAssignementComponent;
  let fixture: ComponentFixture<DirectiveAssignementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectiveAssignementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectiveAssignementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
