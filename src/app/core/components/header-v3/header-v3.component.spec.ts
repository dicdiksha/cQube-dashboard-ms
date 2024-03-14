import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderV3Component } from './header-v3.component';

describe('HeaderV3Component', () => {
  let component: HeaderV3Component;
  let fixture: ComponentFixture<HeaderV3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderV3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderV3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
