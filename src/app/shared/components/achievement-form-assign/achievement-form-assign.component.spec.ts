import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AchievementFormAssignComponent } from './achievement-form-assign.component';

describe('AchievementFormAssignComponent', () => {
  let component: AchievementFormAssignComponent;
  let fixture: ComponentFixture<AchievementFormAssignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AchievementFormAssignComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AchievementFormAssignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
