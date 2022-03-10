import { Component, OnInit } from '@angular/core';
import { LoadDataComponent } from 'app/shared/utils/classes/load-data.component';
import { TalentService } from '../services/talent.service';
import { IOpportunity } from 'app/shared/models/opportunity.model';
import { ConfirmationService } from 'primeng/api';
import { ToastService } from 'app/@core/services/toast.service';
import { OpportunityMode } from 'app/shared/enums/opportunity-mode.enum';
import { OpportunityStatus } from 'app/shared/enums/opportunity-status.enum';
import { AuthService } from 'app/modules/auth/services';
import { NbTabComponent } from '@nebular/theme';


@Component({
  selector: 'ngx-marketplace-talent',
  templateUrl: './marketplace-talent.component.html',
  styleUrls: ['./marketplace-talent.component.scss'],
})
export class MarketplaceTalentComponent extends LoadDataComponent implements OnInit {
  opportunities: IOpportunity[];
  FIELD_SEARCH = 'title';
  REMOTE = OpportunityMode.REMOTE;
  PRESENTIAL = OpportunityMode.PRESENTIAL;
  status = OpportunityStatus.ACTIVE;
  status2 = 'ACTIVE2';
  public rolPyme;
  public rolTalent;
  opportunityStatus = OpportunityStatus;
  tabActive: string;
  constructor(private serviceTalent: TalentService,
    private confirmationService: ConfirmationService, private toastService: ToastService,
    private authService: AuthService) {
    super();
  }

  ngOnInit(): void {
    this.roles();
    this.loadData();
    this.sortOptions = [
      { label: 'Categoría A-Z', value: 'category.name' },
      { label: 'Categoría Z-A', value: '!category.name' },
      { label: 'Título A-Z', value: 'title' },
      { label: 'Título Z-A', value: '!title' },
      { label: 'Remotos', value: 'mode' },
      { label: 'Presenciales', value: '!mode' },
    ];
  }

  loadData() {
    this.isLoaded = false;
    this.serviceTalent.getAllOpportunityStatusActive(this.limitTable,
      this.page, this.q, this.FIELD_SEARCH, this.orderBy = 'proposals.status' ,
      this.orderDirection = 'DESC').subscribe(res => {
        this.opportunities = res['data'];
        this.limitTable = res['limit'];
        this.totalRecords = res['total'];
        this.isLoaded = true;
      });
  }
  onSearch(event) {
    this.search(event);
    this.loadData();
  }
  onApply() {
    this.loadData();
  }

  onPaginate(event) {
    this.paginate(event);
    this.loadData();
  }

  onSortChange(event) {
    this.sortChange(event);
    this.loadData();
  }
  public roles() {
    const role = this.authService.getUserRoleLogin();
    for (const i of role) {
      if (i === 'users') {
        this.rolTalent = 'users';
      } else if (i === 'pyme') {
        this.rolPyme = 'pyme';
      }
    }
  }

  onChangeTab(tab: NbTabComponent) {
    this.tabActive = tab.tabId;
  }
}
