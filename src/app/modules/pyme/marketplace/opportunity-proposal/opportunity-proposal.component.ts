import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { IOpportunity } from 'app/shared/models/opportunity.model';
import { HeaderService } from 'app/@theme/components/header/header.service';
import { OpportunityMode } from 'app/shared/enums/opportunity-mode.enum';
import { ProposalService } from 'app/shared/services/proposal.service';
import { LoadDataComponent } from 'app/shared/utils/classes/load-data.component';
import { IProposal } from 'app/shared/models/proposal.model';
import { NbMediaBreakpointsService, NbThemeService } from '@nebular/theme';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { ConfirmationService } from 'primeng/api';
import { OpportunityService } from 'app/shared/services/opportunity.service';
import { IOpportunityAccept } from 'app/shared/models/opportunity-accept.model';
import { ToastService } from 'app/@core/services/toast.service';
import { DateExpirationService } from 'app/shared/services/date-expiration.service';

@Component({
  selector: 'ngx-opportunity-proposal',
  templateUrl: './opportunity-proposal.component.html',
  styleUrls: ['./opportunity-proposal.component.scss'],
})
export class OpportunityProposalComponent extends LoadDataComponent implements OnInit {

  opportunity: IOpportunity;
  REMOTE = OpportunityMode.REMOTE;
  PRESENTIAL = OpportunityMode.PRESENTIAL;
  proposals: IProposal[] = [];
  displayUser = false;
  selectedProposal: IProposal;

  showTitle: boolean;

  private destroy$: Subject<void> = new Subject<void>();
  loading: boolean;

  constructor(private location: Location, private activatedRoute: ActivatedRoute,
    private headerService: HeaderService, private proposalService: ProposalService,
    private themeService: NbThemeService, private breakpointService: NbMediaBreakpointsService,
    private confirmationService: ConfirmationService, private opportunityService: OpportunityService,
    private toastService: ToastService, public dateExpirationService: DateExpirationService) {
    super();
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ opportunity }) => {
      this.opportunity = opportunity;
      this.headerService.setTitle(this.opportunity.category.name);
      this.loadData();
    });
    // avatar user
    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.showTitle = isLessThanXl);
  }

  onBack() {
    this.location.back();
  }

  loadData() {
    this.isLoaded = false;
    this.proposalService.getAllByOpportunity(this.opportunity.id, this.limitTable,
      this.page, this.q, null, this.orderBy, this.orderDirection).subscribe(res => {
        this.proposals = res['data'];
        this.limitTable = res['limit'];
        this.totalRecords = res['total'];
        this.isLoaded = true;
      });
  }
  getWithEnterDisplay(text) {
    return text.replace('\n', '<br><br>');
  }

  onSelectProposal(proposal: IProposal) {
    this.selectedProposal = proposal;
    this.displayUser = true;
  }

  onCancel() {
    this.displayUser = false;
    this.selectedProposal = null;
  }

  onAcceptProposal(data: IProposal) {
    this.onCancel();
    this.confirmationService.confirm({
      key: 'cdacceptp',
      message: '¿Quiere aceptar la propuesta de ' + data.user.user + '?',
      header: 'Aceptar propuesta',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.accept(data);
      },
    });
  }

  accept(data: IProposal) {
    this.loading = true;
    const acceptProposal: IOpportunityAccept = { talentAssignedId: data.user.id, proposalId: data.id };
    this.opportunityService.accept(acceptProposal, data.opportunityId).subscribe(res => {
      this.toastService.showSuccess('Exitoso', res['message']);
      this.loading = false;
      this.onBack();
    }, (err => {
      this.loading = false;
      this.toastService.showWarning('Atención', 'No se pudo aceptar la propuesta');
    }));

  }
}
