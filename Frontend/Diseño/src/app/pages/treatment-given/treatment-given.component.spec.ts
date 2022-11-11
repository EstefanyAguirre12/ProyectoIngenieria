import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatmentGivenComponent } from './treatment-given.component';

describe('TreatmentGivenComponent', () => {
  let component: TreatmentGivenComponent;
  let fixture: ComponentFixture<TreatmentGivenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreatmentGivenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreatmentGivenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
