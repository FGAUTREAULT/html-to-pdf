import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPrintComponent } from './dashboard-print.component';

describe('DashboardPrintComponent', () => {
  let component: DashboardPrintComponent;
  let fixture: ComponentFixture<DashboardPrintComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardPrintComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPrintComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
