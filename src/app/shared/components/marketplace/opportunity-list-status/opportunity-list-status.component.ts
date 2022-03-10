import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NbMediaBreakpointsService, NbThemeService } from '@nebular/theme';
import { ToastService } from 'app/@core/services/toast.service';
import { AuthService } from 'app/modules/auth/services';
import { OpportunityMode } from 'app/shared/enums/opportunity-mode.enum';
import { OpportunityStatus } from 'app/shared/enums/opportunity-status.enum';
import { IOpportunity } from 'app/shared/models/opportunity.model';
import { IUser } from 'app/shared/models/user.model';
import { IUserAchievement } from 'app/shared/models/userAchievement.model';
import { DateExpirationService } from 'app/shared/services/date-expiration.service';
import { ProposalService } from 'app/shared/services/proposal.service';
import { SelectItem } from 'primeng/api';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ngx-opportunity-list-status',
  templateUrl: './opportunity-list-status.component.html',
  styleUrls: ['./opportunity-list-status.component.scss'],
})
export class OpportunityListStatusComponent implements OnInit {

  REMOTE = OpportunityMode.REMOTE;
  PRESENTIAL = OpportunityMode.PRESENTIAL;
  opportunityStatus = OpportunityStatus;
  user: IUser;
  displayUser = false;
  showTitle: boolean;
  loading = true;
  btnAcept = false;
  idTalento;
  idOportunidad;
  private destroy$: Subject<void> = new Subject<void>();
  userAchievement: IUserAchievement;
  @Input() opportunities: IOpportunity[];
  @Input() sortOptions: SelectItem[];
  @Input() sortField: string;
  @Input() sortOrder: number;
  @Input() totalRecords: number;
  @Input() limitTable: number;
  @Input() status: OpportunityStatus;
  @Input() status2;
  @Input() statuspyme;
  @Input() status3;
  @Input() rolTalent: string;
  @Input() rolPublic: string;
  @Input() displayCreate;
  @Output() onSearch = new EventEmitter<any>();
  @Output() onPaginate = new EventEmitter<any>();
  @Output() onSortChange = new EventEmitter<any>();
  @Output() onConfirmDelete = new EventEmitter<IOpportunity>();
  @Output() onFinish = new EventEmitter<IOpportunity>();
  @Output() onApply = new EventEmitter<IOpportunity>();

  constructor(public dateExpirationService: DateExpirationService,
    private themeService: NbThemeService, private breakpointService: NbMediaBreakpointsService,
    private authSvc: AuthService, private proposalSvc: ProposalService,
    private toast: ToastService, private router: Router) {
  }

  ngOnInit(): void {
    // avatar user
    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanXl: boolean) => this.showTitle = isLessThanXl);
  }

  onSearchEmit(event) {
    this.onSearch.emit(event);
  }

  onPaginateEmit(event) {
    this.onPaginate.emit(event);
  }

  onSortChangeEmit(event) {
    this.onSortChange.emit(event);
  }

  onConfirmDeleteEmit(data: IOpportunity) {
    this.onConfirmDelete.emit(data);
  }

  onFinishEmit(data: IOpportunity) {
    this.onFinish.emit(data);
  }
  onApplyEmit() {
    this.onApply.emit();
  }

  onSelectUser(data: IUser) {
    this.user = data;
    this.displayUser = true;
  }

  onAcept(data: IOpportunity) {
    const idTalent = this.authSvc.getUserIdLogin();
    const idOpportunity = data.id;
    const dataProposal = {
      opportunityId: idOpportunity,
      talentId: idTalent,
    };
    if (idOpportunity)
      this.proposalSvc.save(dataProposal).subscribe(res => {
        this.loading = false;
        this.toast.showSuccess('Exitoso', res['message']);
        this.onApply.emit(data);
      });
  }


  goMatch(id) {
    if (id)
      this.router.navigate(['app/pyme/marketplace/match/' + id]);

  }
  onCreate(item) {
    this.displayCreate = true;
    this.idTalento = item.talentAssignedId;
    this.idOportunidad = item.id;
  }

  onSuccess() {
    this.userAchievement = null;
    this.displayCreate = false;
  }

  onClose() {
    this.userAchievement = null;
    this.displayCreate = false;
  }
}
