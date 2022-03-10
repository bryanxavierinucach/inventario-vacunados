import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PAYMENT_DIVER } from 'app/shared/constants/payment-method.constants';
import { IPaymentPercentage } from 'app/shared/models/payment-percentage.model';

@Component({
  selector: 'ngx-opportunity-percentage-list',
  templateUrl: './opportunity-percentage-list.component.html',
  styleUrls: ['./opportunity-percentage-list.component.scss'],
})
export class OpportunityPercentageListComponent implements OnInit {

  @Input() paymentPercentage: IPaymentPercentage[];
  @Output() deleteItem = new EventEmitter<number>();
  @Output() deleteDiver = new EventEmitter<void>();
  constructor() { }

  ngOnInit(): void {
  }

  onDelete(index: number, percentage: number, name: string) {
    this.paymentPercentage.splice(index, 1);
    this.deleteItem.emit(percentage);
    if (name === PAYMENT_DIVER) {
      this.deleteDiver.emit();
    }
  }

}
