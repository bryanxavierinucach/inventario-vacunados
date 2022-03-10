import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'app/@core/services/toast.service';
import { IReward } from 'app/shared/models/reward.model';
import { RewardService } from '../../services/reward.service';

@Component({
  selector: 'ngx-reward-form',
  templateUrl: './reward-form.component.html',
  styleUrls: ['./reward-form.component.scss'],
})
export class RewardFormComponent implements OnInit {

  formReward: FormGroup;
  loading: boolean;
  specialRewardTooltip: string;

  @Input() reward: IReward;
  @Input() displayCreate: boolean;
  @Output() success = new EventEmitter<void>();
  @Output() closeModal = new EventEmitter<void>();

  constructor(private formBuilder: FormBuilder,
    private rewardService: RewardService, private toastService: ToastService) { }

  ngOnInit() {
    this.formReward = this.formBuilder.group({
      description: [this.reward?.description, Validators.required],
      path: [this.reward?.path, Validators.required],
      ever: [this.reward?.ever, Validators.required],
      amount: [this.reward?.amount, [Validators.required, Validators.min(1)]],
      specialReward: [this.reward?.specialReward, Validators.required],
      active: [this.reward ? this.reward.active : false, Validators.required],
    });

    this.specialRewardTooltip = 'Debe incluir la propiedad specialReward en la petición, ' +
      'ATENCIÓN: se debe modificar el código';
  }

  onClose() {
    this.clean();
    this.closeModal.emit();
  }

  save() {
    if (this.formReward.valid) {
      this.loading = true;
      if (!this.reward) {
        this.rewardService.create(this.formReward.value).subscribe(res => {
          this.loading = false;
          this.toastService.showSuccess('Exitoso', res['message']);
          this.loading = false;
          this.clean();
          this.success.emit();
        }, (err => {
          this.loading = false;
          if (err.error.message)
            this.toastService.showWarning('Atención', err.error.message);
          else
            this.toastService.showWarning('Atención', 'No se pudo ingresar');
        }));
      } else {
        this.rewardService.update(this.formReward.value, this.reward.id).subscribe(res => {
          this.loading = false;
          this.toastService.showSuccess('Exitoso', res['message']);
          this.loading = false;
          this.clean();
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
  clean() {
    this.formReward.markAsPristine();
    this.formReward.markAsUntouched();
    this.formReward.updateValueAndValidity();
    this.formReward.reset();
  }
}
