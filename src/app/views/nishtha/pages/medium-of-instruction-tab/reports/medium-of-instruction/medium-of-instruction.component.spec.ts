import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediumOfInstructionComponent } from './medium-of-instruction.component';

describe('MediumOfInstructionComponent', () => {
  let component: MediumOfInstructionComponent;
  let fixture: ComponentFixture<MediumOfInstructionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediumOfInstructionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediumOfInstructionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
