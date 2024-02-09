import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UdiseComponent } from './udise.component';

describe('UdiseComponent', () => {
    let component: UdiseComponent;
    let fixture: ComponentFixture<UdiseComponent>;

    beforeEach(async () => {
    await TestBed.configureTestingModule({
        declarations: [ UdiseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UdiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    });

    it('should create', () => {
    expect(component).toBeTruthy();
    });
});
