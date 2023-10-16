import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImplementationStatusComponent } from './implementation-status.component';

describe('ImplementationStatusComponent', () => {
  let component: ImplementationStatusComponent;
  let fixture: ComponentFixture<ImplementationStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImplementationStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImplementationStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
