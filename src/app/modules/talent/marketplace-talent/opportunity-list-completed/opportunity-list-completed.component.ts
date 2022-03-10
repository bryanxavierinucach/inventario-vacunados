import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/modules/auth/services';
import { OpportunityMode } from 'app/shared/enums/opportunity-mode.enum';
import { OpportunityStatus } from 'app/shared/enums/opportunity-status.enum';
import { IOpportunity } from 'app/shared/models/opportunity.model';
import { OpportunityService } from 'app/shared/services/opportunity.service';
import { LoadDataComponent } from 'app/shared/utils/classes/load-data.component';

@Component({
  selector: 'ngx-opportunity-list-completed',
  templateUrl: './opportunity-list-completed.component.html',
  styleUrls: ['./opportunity-list-completed.component.scss'],
})
export class OpportunityListCompletedComponent extends LoadDataComponent implements OnInit {

  opportunities: IOpportunity[];
  FIELD_SEARCH = 'title';
  REMOTE = OpportunityMode.REMOTE;
  PRESENTIAL = OpportunityMode.PRESENTIAL;
  status = OpportunityStatus.COMPLETED;
  status2 = 'ACTIVE2';
  constructor(private opportunityService: OpportunityService, private authService: AuthService) {
    super();
  }

  ngOnInit(): void {
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
    const userId = this.authService.getUserIdLogin();
    this.opportunityService.getAllByStatusByTalent(userId, this.status, this.limitTable,
      this.page, this.q, this.FIELD_SEARCH, this.orderBy, this.orderDirection).subscribe(res => {
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

  onPaginate(event) {
    this.paginate(event);
    this.loadData();
  }

  onSortChange(event) {
    this.sortChange(event);
    this.loadData();
  }

}
