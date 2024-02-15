import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NasComponent } from './nas-apex.component';

describe('NasComponent', () => {
    let component: NasComponent;
    let fixture: ComponentFixture<NasComponent>;

    beforeEach(async () => {
    await TestBed.configureTestingModule({
        declarations: [ NasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    });

    it('should create', () => {
    expect(component).toBeTruthy();
    });
});
