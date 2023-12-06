import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedStatusTabComponent } from './detailed-status-tab.component';

describe('DetailedStatusTabComponent', () => {
  let component: DetailedStatusTabComponent;
  let fixture: ComponentFixture<DetailedStatusTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailedStatusTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailedStatusTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
