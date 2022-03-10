import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastService } from 'app/@core/services/toast.service';
import { AuthService } from '../services';
import { WalletService } from '../services/wallet.service';

@Component({
  selector: 'ngx-wallet-form',
  templateUrl: './wallet-form.component.html',
  styleUrls: ['./wallet-form.component.scss'],
})
export class WalletFormComponent implements OnInit {

  formWallet: FormGroup;
  loading: boolean;
  userId: string;
  isValid: boolean = true;

  @Input() walletAddress: string;
  @Input() displayWallet: string;
  @Output() success = new EventEmitter<void>();
  @Output() closeModal = new EventEmitter<void>();

  constructor(private formBuilder: FormBuilder,
    private walletService: WalletService,
    private authService: AuthService, private toastService: ToastService) { }

  ngOnInit(): void {
    this.formWallet = this.formBuilder.group({
      walletAddress: [this.walletAddress, [Validators.required]],
      specialReward: [true], // especial reward, el enpoint se usa el mismo de actualizar usuario
    });
  }

  onClose() {
    this.clean();
    this.closeModal.emit();
  }

  save() {
    if (this.formWallet.valid) {
      this.userId = this.authService.getUserIdLogin();
      this.loading = true;
      this.isValid = true;
      this.walletService.validateAddress(this.formWallet.value.walletAddress).subscribe(resValidate => {
        if (resValidate['isvalid']) {
          this.walletService.update(this.formWallet.value, this.userId).subscribe(res => {
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
          this.toastService.showWarning('Atención', 'Dirección no es válida');
          this.isValid = false;
          this.loading = false;
        }
      }, (err) => {
        if (err.status) {
          this.toastService.showWarning('Atención', 'Dirección no es válida');
          this.isValid = false;
        } else {
          this.toastService.showWarning('Atención', 'Hubo un problema, intenta más tarde');
        }
        this.loading = false;
      });
    }
  }

  clean() {
    this.formWallet.reset();
    this.isValid = false;
  }
}
