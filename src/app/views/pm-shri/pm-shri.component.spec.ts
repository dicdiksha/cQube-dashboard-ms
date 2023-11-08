import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PmShriComponent } from './pm-shri.component';

describe('PmShriComponent', () => {
  let component: PmShriComponent;
  let fixture: ComponentFixture<PmShriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PmShriComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PmShriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
