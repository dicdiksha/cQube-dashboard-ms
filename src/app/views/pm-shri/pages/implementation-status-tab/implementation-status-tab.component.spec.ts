import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImplementationStatusTabComponent } from './implementation-status-tab.component';

describe('ImplementationStatusTabComponent', () => {
  let component: ImplementationStatusTabComponent;
  let fixture: ComponentFixture<ImplementationStatusTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImplementationStatusTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImplementationStatusTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
