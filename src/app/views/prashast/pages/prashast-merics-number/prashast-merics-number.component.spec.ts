import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrashastMericsNumberComponent } from './prashast-merics-number.component';

describe('PrashastMericsNumberComponent', () => {
  let component: PrashastMericsNumberComponent;
  let fixture: ComponentFixture<PrashastMericsNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrashastMericsNumberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrashastMericsNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
