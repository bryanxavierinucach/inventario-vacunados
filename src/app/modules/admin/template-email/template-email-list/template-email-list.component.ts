import { Component, OnInit } from '@angular/core';
import { ToastService } from 'app/@core/services/toast.service';
import { ITemplateEmail } from 'app/shared/models/template-email.model';
import { TemplateEmailService } from 'app/shared/services/template-email.service';
import { LoadDataComponent } from 'app/shared/utils/classes/load-data.component';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'ngx-template-email-list',
  templateUrl: './template-email-list.component.html',
  styleUrls: ['./template-email-list.component.scss'],
})
export class TemplateEmailListComponent extends LoadDataComponent implements OnInit {

  templateEmails: ITemplateEmail[];
  private FIELD_SEARCH = 'path';

  constructor(private templateEmailService: TemplateEmailService,
    private confirmationService: ConfirmationService,
    private toastService: ToastService) {
      super();
    }

  ngOnInit(): void {
    this.loadData();
    this.sortOptions = [
      { label: 'Código A-Z', value: 'code' },
      { label: 'Código Z-A', value: '!code' },
    ];
  }

  loadData() {
    this.isLoaded = false;
    this.templateEmailService.getAll(this.limitTable,
      this.page, this.q, this.FIELD_SEARCH, this.orderBy, this.orderDirection).subscribe(res => {
        this.templateEmails = res['data'];
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

  onConfirmDelete(data: ITemplateEmail) {
    this.confirmationService.confirm({
      key: 'cddelete',
      message: '¿Quiere eliminar ' + data.code + '?',
      header: 'Confimar eliminación',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.delete(data.id);
      },
    });
  }

  delete(id: string) {
    this.isLoaded = false;
    this.templateEmailService.delete(id).subscribe(res => {
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
