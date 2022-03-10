import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAchieveListComponent } from './user-achieve-list.component';

describe('UserAchieveListComponent', () => {
  let component: UserAchieveListComponent;
  let fixture: ComponentFixture<UserAchieveListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserAchieveListComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAchieveListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
