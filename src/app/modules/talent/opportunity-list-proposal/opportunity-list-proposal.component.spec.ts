import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunityListProposalComponent } from './opportunity-list-proposal.component';

describe('OpportunityListProposalComponent', () => {
  let component: OpportunityListProposalComponent;
  let fixture: ComponentFixture<OpportunityListProposalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpportunityListProposalComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OpportunityListProposalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
