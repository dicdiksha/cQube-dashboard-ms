import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrashastComponent } from './prashast.component';

describe('PrashastComponent', () => {
  let component: PrashastComponent;
  let fixture: ComponentFixture<PrashastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrashastComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrashastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
