import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentMethodListComponent } from './payment-method-list/payment-method-list.component';
import { PaymentMethodComponent } from './payment-method.component';

const routes: Routes = [
  {
    path: '',
    component: PaymentMethodComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentMethodRoutingModule { }
