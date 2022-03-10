import { Component, OnInit } from '@angular/core';
import { ToastService } from 'app/@core/services/toast.service';
import { AuthService } from 'app/modules/auth/services';
import { OpportunityMode } from 'app/shared/enums/opportunity-mode.enum';
import { OpportunityStatus } from 'app/shared/enums/opportunity-status.enum';
import { IOpportunity } from 'app/shared/models/opportunity.model';
import { OpportunityService } from 'app/shared/services/opportunity.service';
import { LoadDataComponent } from 'app/shared/utils/classes/load-data.component';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'ngx-opportunity-list-active',
  templateUrl: './opportunity-list-active.component.html',
  styleUrls: ['./opportunity-list-active.component.scss'],
})
export class OpportunityListActiveComponent extends LoadDataComponent implements OnInit {

  opportunities: IOpportunity[];
  FIELD_SEARCH = 'title';
  REMOTE = OpportunityMode.REMOTE;
  PRESENTIAL = OpportunityMode.PRESENTIAL;
  status = OpportunityStatus.ACTIVE;
  statuspyme = 'STATUSPYME';
  constructor(private opportunityService: OpportunityService, private authService: AuthService,
    private confirmationService: ConfirmationService, private toastService: ToastService) {
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
    this.opportunityService.getAllByStatusByPyme(userId, this.status, this.limitTable,
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

  onConfirmDelete(data: IOpportunity) {
    this.confirmationService.confirm({
      key: 'cddelete',
      message: '¿Quiere eliminar ' + data.title + '?',
      header: 'Confimar eliminación',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.delete(data.id);
      },
    });
  }

  delete(id: string) {
    this.isLoaded = false;
    this.opportunityService.delete(id).subscribe(res => {
      this.isLoaded = true;
      this.loadData();
      this.toastService.showSuccess('Eliminado', res['message']);
    }, err => {
      this.isLoaded = true;
      if (err.error.message)
        this.toastService.showWarning('Atención', err.error.message);
      else
        this.toastService.showWarning('Atención', 'No se pudo eliminar');
    });
  }
}
