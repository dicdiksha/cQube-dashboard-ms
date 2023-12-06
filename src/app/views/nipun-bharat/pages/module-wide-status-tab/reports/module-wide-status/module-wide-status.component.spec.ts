import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleWideStatusComponent } from './module-wide-status.component';

describe('ModuleWideStatusComponent', () => {
  let component: ModuleWideStatusComponent;
  let fixture: ComponentFixture<ModuleWideStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleWideStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleWideStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
