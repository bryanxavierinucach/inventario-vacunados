import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileFormPymeComponent } from './profile-form-pyme.component';

describe('ProfileFormPymeComponent', () => {
  let component: ProfileFormPymeComponent;
  let fixture: ComponentFixture<ProfileFormPymeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileFormPymeComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileFormPymeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
