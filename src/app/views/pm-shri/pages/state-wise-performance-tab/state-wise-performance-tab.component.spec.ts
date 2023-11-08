import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StateWisePerformanceTabComponent } from './state-wise-performance-tab.component';

describe('StateWisePerformanceTabComponent', () => {
  let component: StateWisePerformanceTabComponent;
  let fixture: ComponentFixture<StateWisePerformanceTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StateWisePerformanceTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StateWisePerformanceTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
