import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedStatusComponent } from './detailed-status.component';

describe('DetailedStatusComponent', () => {
  let component: DetailedStatusComponent;
  let fixture: ComponentFixture<DetailedStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailedStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailedStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
