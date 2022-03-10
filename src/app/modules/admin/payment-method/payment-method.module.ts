import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaymentMethodRoutingModule } from './payment-method-routing.module';
import { PaymentMethodListComponent } from './payment-method-list/payment-method-list.component';
import { PaymentMethodFormComponent } from './payment-method-form/payment-method-form.component';
import { PagesModule } from 'app/modules/pages.module';
import { PaginatorModule } from 'primeng/paginator';
import { DialogModule } from 'primeng/dialog';
import { PaymentMethodComponent } from './payment-method.component';


@NgModule({
  declarations: [PaymentMethodListComponent, PaymentMethodFormComponent, PaymentMethodComponent],
  imports: [
    CommonModule,
    PaymentMethodRoutingModule,
    PagesModule,
    PaginatorModule,
    DialogModule,
  ],
})
export class PaymentMethodModule { }
