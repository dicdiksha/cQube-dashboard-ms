import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleWideStatusTabComponent } from './module-wide-status-tab.component';

describe('ModuleWideStatusTabComponent', () => {
  let component: ModuleWideStatusTabComponent;
  let fixture: ComponentFixture<ModuleWideStatusTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleWideStatusTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleWideStatusTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
