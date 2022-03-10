import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastService } from 'app/@core/services/toast.service';
import { LoadDataComponent } from 'app/shared/utils/classes/load-data.component';
import { ConfirmationService } from 'primeng/api';
import { PaymentMethodService } from '../../../../shared/services/payment-method.service';
import { IPaymentMethod } from 'app/shared/models/payment-method.model';

@Component({
  selector: 'ngx-payment-method-list',
  templateUrl: './payment-method-list.component.html',
  styleUrls: ['./payment-method-list.component.scss'],
})
export class PaymentMethodListComponent extends LoadDataComponent implements OnInit {

  payments: IPaymentMethod[];
  public FIELD_SEARCH = 'name';

  @Output() updateEvent = new EventEmitter<IPaymentMethod>();
  constructor(private paymentService: PaymentMethodService, private confirmationService: ConfirmationService,
    private toastService: ToastService) {
    super();
  }

  ngOnInit(): void {
    this.loadData();
    this.sortOptions = [
      { label: 'Detalle A-Z', value: 'name' },
      { label: 'Detalle Z-A', value: '!name' },
    ];
  }

  loadData() {
    this.isLoaded = false;
    this.paymentService.getAll(this.limitTable,
      this.page, this.q, this.FIELD_SEARCH, this.orderBy, this.orderDirection).subscribe(res => {
        this.payments = res['data'];
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

  onUpdate(data: IPaymentMethod) {
    this.updateEvent.emit(data);
  }

  onConfirmDelete(data: IPaymentMethod) {
    this.confirmationService.confirm({
      key: 'cddelete',
      message: '¿Quiere eliminar?',
      header: 'Confimar eliminación',
      icon: 'pi pi-info-circle',
      accept: () => {
        this.delete(data.id);
      },
    });
  }
  delete(id: string) {
    this.isLoaded = false;
    this.paymentService.delete(id).subscribe(res => {
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
