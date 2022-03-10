import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPymeComponent } from './dashboard-pyme.component';

describe('DashboardPymeComponent', () => {
  let component: DashboardPymeComponent;
  let fixture: ComponentFixture<DashboardPymeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardPymeComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPymeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
