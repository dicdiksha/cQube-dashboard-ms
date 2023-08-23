import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediumOfInstructionTabComponent } from './medium-of-instruction-tab.component';

describe('MediumOfInstructionTabComponent', () => {
  let component: MediumOfInstructionTabComponent;
  let fixture: ComponentFixture<MediumOfInstructionTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediumOfInstructionTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediumOfInstructionTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
