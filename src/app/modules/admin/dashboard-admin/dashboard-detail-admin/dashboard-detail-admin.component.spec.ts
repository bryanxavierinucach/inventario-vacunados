import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDetailAdminComponent } from './dashboard-detail-admin.component';

describe('DashboardDetailAdminComponent', () => {
  let component: DashboardDetailAdminComponent;
  let fixture: ComponentFixture<DashboardDetailAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardDetailAdminComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardDetailAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
