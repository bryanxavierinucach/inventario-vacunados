import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderService } from 'app/@theme/components/header/header.service';
import { TITLE_PAYMENTMETHOD } from 'app/shared/constants/title-pages.contants';
import { IPaymentMethod } from 'app/shared/models/payment-method.model';
import { ModalSizeComponent } from 'app/shared/utils/classes/modal-size.component';
import { PaymentMethodListComponent } from './payment-method-list/payment-method-list.component';




@Component({
  selector: 'ngx-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.scss'],
})
export class PaymentMethodComponent extends ModalSizeComponent implements OnInit {
  displayCreate: boolean;
  paymentMethod: IPaymentMethod;
  @ViewChild(PaymentMethodListComponent) paymentList;
  constructor(private headerService: HeaderService) {
    super();
  }

  ngOnInit(): void {
    this.headerService.setTitle(TITLE_PAYMENTMETHOD);
    }

  onCreate() {
    this.displayCreate = true;
  }

  onUpdate(data: IPaymentMethod) {
    this.paymentMethod = data;
    this.displayCreate = true;
  }

  onSuccess() {
    this.paymentMethod = null;
    this.displayCreate = false;
    this.paymentList.loadData();
  }


  onClose() {
    this.paymentMethod = null;
    this.displayCreate = false;
  }

}
