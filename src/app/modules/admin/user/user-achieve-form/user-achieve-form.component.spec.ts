import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAchieveFormComponent } from './user-achieve-form.component';

describe('UserAchieveFormComponent', () => {
  let component: UserAchieveFormComponent;
  let fixture: ComponentFixture<UserAchieveFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAchieveFormComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAchieveFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
