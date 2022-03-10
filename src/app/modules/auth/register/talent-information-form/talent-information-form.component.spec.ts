import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentInformationFormComponent } from './talent-information-form.component';

describe('TalentInformationFormComponent', () => {
  let component: TalentInformationFormComponent;
  let fixture: ComponentFixture<TalentInformationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TalentInformationFormComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TalentInformationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
