import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PymeInformationFormComponent } from './pyme-information-form.component';

describe('PymeInformationFormComponent', () => {
  let component: PymeInformationFormComponent;
  let fixture: ComponentFixture<PymeInformationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PymeInformationFormComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PymeInformationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
