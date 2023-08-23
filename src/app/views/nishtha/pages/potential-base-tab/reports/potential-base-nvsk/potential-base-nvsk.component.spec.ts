import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PotentialBaseNvskComponent } from './potential-base-nvsk.component';

describe('PotentialBaseNvskComponent', () => {
  let component: PotentialBaseNvskComponent;
  let fixture: ComponentFixture<PotentialBaseNvskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PotentialBaseNvskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PotentialBaseNvskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
