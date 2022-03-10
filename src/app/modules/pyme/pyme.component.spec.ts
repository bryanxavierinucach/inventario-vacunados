import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PymeComponent } from './pyme.component';

describe('PymeComponent', () => {
  let component: PymeComponent;
  let fixture: ComponentFixture<PymeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PymeComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PymeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
