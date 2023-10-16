import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BignumberMetricsComponent } from './udise-bignumber-metrics.component';

describe('BignumberMetricsComponent', () => {
  let component: BignumberMetricsComponent;
  let fixture: ComponentFixture<BignumberMetricsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BignumberMetricsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BignumberMetricsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
