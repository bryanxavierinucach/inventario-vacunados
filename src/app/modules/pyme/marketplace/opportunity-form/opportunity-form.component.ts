import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'app/@core/services/toast.service';
import { HeaderService } from 'app/@theme/components/header/header.service';
import { ICategory } from 'app/shared/models/category.model';
import { IOpportunity } from 'app/shared/models/opportunity.model';
import { IPaymentMethod } from 'app/shared/models/payment-method.model';
import { IPaymentPercentage } from 'app/shared/models/payment-percentage.model';
import { CategoryService } from 'app/shared/services/category.service';
import { OpportunityService } from 'app/shared/services/opportunity.service';
import { PaymentMethodService } from 'app/shared/services/payment-method.service';
import { OpportunityMode } from 'app/shared/enums/opportunity-mode.enum';
import { ActivatedRoute } from '@angular/router';
import { PAYMENT_DIVER } from 'app/shared/constants/payment-method.constants';

@Component({
  selector: 'ngx-opportunity-form',
  templateUrl: './opportunity-form.component.html',
  styleUrls: ['./opportunity-form.component.scss'],
})
export class OpportunityFormComponent implements OnInit {

  formOpportunity: FormGroup;
  formPayment: FormGroup;
  loading: boolean;
  paymentMethods: IPaymentMethod[];
  paymentPercentages?: IPaymentPercentage[] = [];
  categories?: ICategory[] = [];
  REMOTE = OpportunityMode.REMOTE;
  PRESENTIAL = OpportunityMode.PRESENTIAL;
  PAYMENT_DIVER = PAYMENT_DIVER;
  opportunity: IOpportunity;
  loadingData: boolean;
  value: number = 0;
  today = new Date();
  paymentDiver: boolean;
  addDiver: boolean;

  constructor(private formBuilder: FormBuilder, private headerService: HeaderService,
    private paymentMethodService: PaymentMethodService, private opportunityService: OpportunityService,
    private categoryService: CategoryService, private toastService: ToastService,
    private location: Location, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.headerService.setTitle('Nueva oportunidad');

    this.formOpportunity = this.formBuilder.group({
      categoryId: [this.opportunity?.categoryId, Validators.required],
      title: [this.opportunity?.title, Validators.required],
      description: [this.opportunity?.description, Validators.required],
      dateExpiration: [this.opportunity?.dateExpiration, Validators.required],
      dateStart: [this.opportunity?.dateStart, Validators.required],
      dateEnd: [this.opportunity?.dateEnd, Validators.required],
      paymentPercentages: [null],
      mode: [this.opportunity?.mode, Validators.required],
    });
    this.formPayment = this.formBuilder.group({
      paymentMethodId: [null, Validators.required],
      percentage: [100, [Validators.required, Validators.min(1), Validators.max(100)]],
      paymentDiver: [null],
    });
    this.loadDataPaymentMethods();
    this.loadCategories();
    this.activatedRoute.data.subscribe(({ opportunity }) => {
      if (opportunity)
        this.updateForm(opportunity);
    });

  }

  updateForm(opportunity: IOpportunity) {
    this.opportunity = opportunity;
    this.headerService.setTitle('Actualizar oportunidad');
    this.paymentPercentages = this.opportunity.paymentPercentages;
    this.paymentPercentages.forEach(payment => {
      this.value += payment.percentage;
    });
    this.formOpportunity.patchValue({
      categoryId: this.opportunity?.categoryId,
      title: this.opportunity?.title,
      description: this.opportunity?.description,
      dateExpiration: new Date(this.opportunity?.dateExpiration),
      dateStart: new Date(this.opportunity?.dateStart),
      dateEnd: new Date(this.opportunity?.dateEnd),
      paymentPercentages: this.opportunity?.paymentPercentages,
      mode: this.opportunity?.mode,
    });
    this.paymentDiver = false;
    this.opportunity.paymentPercentages.forEach(percentage => {
      if (percentage.paymentMethod.name === PAYMENT_DIVER) {
        this.paymentDiver = true;
        return;
      }
    });
    this.formPayment.patchValue({
      paymentDiver: this.paymentDiver,
    });

  }


  onSave() {
    this.formOpportunity.patchValue({
      paymentPercentages: this.paymentPercentages,
    });
    this.loading = true;
    if (this.formOpportunity.valid) {
      if (!this.opportunity) {
        this.opportunityService.create(this.formOpportunity.value).subscribe(res => {
          this.loading = false;
          this.toastService.showSuccess('Exitoso', res['message']);
          this.loading = false;
          this.clean();
          this.location.back();
        }, (err => {
          this.loading = false;
          if (err.error.message)
            this.toastService.showWarning('Atención', err.error.message);
          else
            this.toastService.showWarning('Atención', 'No se pudo crear');
        }));
      } else {
        this.opportunityService.update(this.formOpportunity.value, this.opportunity.id).subscribe(res => {
          this.loading = false;
          this.toastService.showSuccess('Exitoso', res['message']);
          this.loading = false;
          this.onBack();
        }, (err => {
          this.loading = false;
          if (err.error.message)
            this.toastService.showWarning('Atención', err.error.message);
          else
            this.toastService.showWarning('Atención', 'No se pudo crear');
        }));
      }
    }

  }

  onAddPayment() {
    if (this.formPayment.valid) {
      const { paymentMethodId, percentage } = this.formPayment.value;
      this.addPayment(paymentMethodId, percentage);
    }
  }

  addPayment(paymentMethodId, percentage) {
    const totalPercentage = this.value + percentage;
    if (totalPercentage <= 100) {
      const payment = this.getPymentMethod(paymentMethodId);
      if (payment) {
        this.value += percentage;
        let isExist = false;
        for (let i = 0; i < this.paymentPercentages.length; i++) {
          const element = this.paymentPercentages[i];
          if (element.paymentMethodId === paymentMethodId) {
            element.percentage += percentage;
            isExist = true;
          }
        }
        if (!isExist) {
          this.paymentPercentages.push({
            paymentMethodId,
            paymentMethod: payment,
            percentage,
          });
        }
        if (this.paymentDiver) {
          this.formPayment.controls['percentage']
            .setValidators([Validators.required, Validators.min(1), Validators.max(100 - percentage)]);
          this.formPayment.updateValueAndValidity();
          this.paymentDiver = false;
          let id = null;
          this.paymentMethods.forEach(element => {
            if (element.id !== paymentMethodId) {
              id = element.id;
              return;
            }
          });
          this.formPayment.patchValue({
            paymentMethodId: id,
            percentage: 100 - percentage,
          });
          this.addDiver = false;
        }
      }
    }
  }

  onDeleteItem(value) {
    this.value -= value;
    this.formPayment.controls['percentage']
      .setValidators([Validators.required, Validators.min(1), Validators.max(100 - this.value)]);
    this.formPayment.updateValueAndValidity();
  }

  onDeleteDiver() {
    this.reset();
    this.addDiver = true;
    this.paymentDiver = true;
    this.paymentMethods.forEach(payment => {
      if (payment.name === PAYMENT_DIVER) {
        this.formPayment.patchValue({
          paymentMethodId: payment.id,
          percentage: 15,
        });
      }
    });
  }

  getPymentMethod(id): IPaymentMethod {
    return this.paymentMethods.find(element => element.id === id);
  }

  async loadDataPaymentMethods() {
    this.loadingData = true;
    let total = 100;
    const limit = 100;
    let page = 1;
    this.paymentMethods = [];
    try {
      while (this.paymentMethods.length <= total) {
        const data = await this.paymentMethodService.getAll(limit,
          page, null, null, 'name', 'asc').toPromise();
        const value = data['data'];
        this.paymentMethods.push(...value);
        total = data['total'];
        page++;
        if (this.paymentMethods.length === total) {
          this.loadingData = false;
          return;
        }
      }
    } catch (err) {
      this.loadingData = false;
    }
  }


  loadCategories() {
    this.categoryService.getAll().subscribe(res => {
      this.categories = res as ICategory[];
    });
  }

  setValue(newValue) {
    this.value = Math.min(Math.max(newValue, 0), 100);
  }

  clean() {
    this.formOpportunity.patchValue({
      categoryId: null,
      title: null,
      description: null,
      dateExpiration: null,
      dateStart: null,
      dateEnd: null,
      paymentPercentages: null,
      mode: null,
    });
  }

  onChangeDate(event) {
    const { dateEnd, dateStart } = this.formOpportunity.value;
    if (dateEnd && event > dateEnd) {
      this.formOpportunity.patchValue({
        dateEnd: null,
        dateStart: null,
      });
    }
    if (dateStart && event < dateStart) {
      this.formOpportunity.patchValue({
        dateStart: null,
      });
    }
  }

  onBack() {
    this.location.back();
    this.clean();
  }

  onChangePayment(value) {
    this.paymentDiver = value;
    this.reset();
    if (this.paymentDiver) {
      this.addDiver = true;
      this.paymentMethods.forEach(payment => {
        if (payment.name === PAYMENT_DIVER) {
          this.formPayment.patchValue({
            paymentMethodId: payment.id,
            percentage: 15,
          });
        }
      });
    } else {
      this.formPayment.controls['percentage'].setValue(100);
      this.formPayment.controls['paymentMethodId'].setValue(null);
      this.addDiver = false;
    }
  }

  reset() {
    this.paymentPercentages = [];
    this.value = 0;
    this.formPayment.controls['percentage']
      .setValidators([Validators.required, Validators.min(1), Validators.max(100)]);
    this.formPayment.updateValueAndValidity();
  }
}
