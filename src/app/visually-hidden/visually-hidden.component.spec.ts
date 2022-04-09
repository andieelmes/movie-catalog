import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisuallyHiddenComponent } from './visually-hidden.component';

describe('VisuallyHiddenComponent', () => {
  let component: VisuallyHiddenComponent;
  let fixture: ComponentFixture<VisuallyHiddenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisuallyHiddenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisuallyHiddenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
