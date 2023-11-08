import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateWisePerformanceComponent } from './state-wise-performance.component';

describe('StateWisePerformanceComponent', () => {
  let component: StateWisePerformanceComponent;
  let fixture: ComponentFixture<StateWisePerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StateWisePerformanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StateWisePerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
