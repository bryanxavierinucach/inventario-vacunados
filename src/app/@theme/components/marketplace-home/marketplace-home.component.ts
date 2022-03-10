import { Component, OnInit } from '@angular/core';
import { LoadDataComponent } from 'app/shared/utils/classes/load-data.component';
import { IOpportunity } from 'app/shared/models/opportunity.model';
import { ConfirmationService } from 'primeng/api';
import { ToastService } from 'app/@core/services/toast.service';
import { OpportunityMode } from 'app/shared/enums/opportunity-mode.enum';
import { OpportunityStatus } from 'app/shared/enums/opportunity-status.enum';
import { AuthService } from 'app/modules/auth/services';
import { TalentService } from 'app/modules/talent/services/talent.service';

@Component({
  selector: 'ngx-marketplace-home',
  templateUrl: './marketplace-home.component.html',
  styleUrls: ['./marketplace-home.component.scss'],
})
export class MarketplaceHomeComponent extends LoadDataComponent implements OnInit {
  opportunities: IOpportunity[];
  FIELD_SEARCH = 'title';
  REMOTE = OpportunityMode.REMOTE;
  PRESENTIAL = OpportunityMode.PRESENTIAL;
  status = OpportunityStatus.ACTIVE;
  public rolPublic;
  constructor(private serviceTalent: TalentService,
    private authService: AuthService) {
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
    this.rolPublic = 'public';
    this.serviceTalent.getAllOpportunityStatusActive(this.limitTable,
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
