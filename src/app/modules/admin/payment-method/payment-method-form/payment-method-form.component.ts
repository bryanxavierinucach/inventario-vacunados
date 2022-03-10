import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'app/@core/services/toast.service';
import { IPaymentMethod } from 'app/shared/models/payment-method.model';
import { PaymentMethodService } from '../../../../shared/services/payment-method.service';

@Component({
  selector: 'ngx-payment-method-form',
  templateUrl: './payment-method-form.component.html',
  styleUrls: ['./payment-method-form.component.scss'],
})
export class PaymentMethodFormComponent implements OnInit {
  formPayment: FormGroup;
  loading: boolean;

  @Input() paymentMethod: IPaymentMethod;
  @Input() displayCreate: boolean;
  @Output() success = new EventEmitter<void>();
  @Output() closeModal = new EventEmitter<void>();

  constructor( private paymentMethodService: PaymentMethodService, private formBuilder: FormBuilder,
    private toastService: ToastService) { }

  ngOnInit(): void {

    this.formPayment = this.formBuilder.group({
      name: [this.paymentMethod?.name, Validators.required],
      icon: [this.paymentMethod?.icon, Validators.required],
    });
  }
  onClose() {
    this.clean();
    this.closeModal.emit();
  }
  clean() {
    this.formPayment.markAsPristine();
    this.formPayment.markAsUntouched();
    this.formPayment.updateValueAndValidity();
    this.formPayment.reset();
  }
  save() {
    if (this.formPayment.valid) {
      this.loading = true;
      if (!this.paymentMethod) {
        this.paymentMethodService.create(this.formPayment.value).subscribe(res => {
          this.loading = false;
          this.toastService.showSuccess('Exitoso', res['message']);
          this.loading = false;
          this.formPayment.reset();
          this.success.emit();
        }, (err => {
          this.loading = false;
          if (err.error.message)
            this.toastService.showWarning('Atención', err.error.message);
          else
            this.toastService.showWarning('Atención', 'No se pudo ingresar');
        }));
      } else {
        this.paymentMethodService.update(this.formPayment.value, this.paymentMethod.id).subscribe(res => {
          this.loading = false;
          this.toastService.showSuccess('Exitoso', res['message']);
          this.loading = false;
          this.formPayment.reset();
          this.success.emit();
        }, (err => {
          this.loading = false;
          if (err.error.message)
            this.toastService.showWarning('Atención', err.error.message);
          else
            this.toastService.showWarning('Atención', 'No se pudo actualizar');
        }));
      }
    }
  }
}
