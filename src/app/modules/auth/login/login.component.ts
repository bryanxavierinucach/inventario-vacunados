import { Component, HostListener, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'app/@core/services/toast.service';
import { LoginForm } from '../models/login.form';
import { AuthService } from 'app/modules/auth/services';
import { ROLE_ADMIN, ROLE_PYME, ROLE_TALENT } from 'app/shared/constants/roles.constants';
import { ModalSizeComponent } from 'app/shared/utils/classes/modal-size.component';
import { IUser } from 'app/shared/models/user.model';
import { NbMediaBreakpointsService, NbThemeService } from '@nebular/theme';
import { map, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UserService } from 'app/shared/services/user.service';
import { SocialAuth } from 'app/shared/enums/social-auth.enum';

@Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends ModalSizeComponent implements OnInit {

  formData: FormGroup;
  formEmail: FormGroup;
  formRole: FormGroup;
  user: IUser;
  showPassword = false;
  validatedUser = false;
  loading = false;
  loadingSend = false;
  sendEmail = false;
  displayWallet = false;
  noRole = false;
  private destroy$: Subject<void> = new Subject<void>();
  isLessThanSm = false;
  socialAuth: SocialAuth;

  constructor(private authService: AuthService,
    private router: Router,
    private toast: ToastService,
    private _loginForm: LoginForm,
    private themeService: NbThemeService,
    private breakpointService: NbMediaBreakpointsService,
    private userService: UserService) {
    super();
  }

  ngOnInit(): void {
    this.formData = this._loginForm.getForm();
    this.formEmail = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
    });
    this.formRole = new FormGroup({
      role: new FormControl(null, [Validators.required]),
      userId: new FormControl(null),
    });
    const { sm } = this.breakpointService.getBreakpointsMap();
    this.themeService.onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < sm),
        takeUntil(this.destroy$),
      )
      .subscribe((isLessThanSm: boolean) => {
        this.isLessThanSm = isLessThanSm;
      });

    // Minúsculas y sin espacios
    this.formData.get('username').valueChanges.subscribe((event) => {
      let text = event.toLowerCase() as string;
      if (text)
        text = this.trimText(text);
      this.formData.get('username').setValue(text, { emitEvent: false });
    });
    this.formEmail.get('email').valueChanges.subscribe((event) => {
      let text = event.toLowerCase() as string;
      if (text)
        text = this.trimText(text);
      this.formEmail.get('email').setValue(text, { emitEvent: false });
    });
    this.isAuth();
  }

  trimText(text: string) {
    try {
      const arrayText = text.split(' ');
      if (arrayText && arrayText.length > 1) {
        let finalText = '';
        arrayText.forEach(t => {
          finalText += t.trim();
        });
        return finalText;
      } else {
        return text.trim();
      }
    } catch (error) {
      return text;
    }
  }


  private markFormGroupTouched(formGroup: FormGroup) {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control.controls) {
        this.markFormGroupTouched(control);
      }
    });
  }
  private getFormData(object): URLSearchParams {
    const body = new URLSearchParams();
    Object.keys(object).forEach(key => { body.set(key, object[key]); });
    return body;
  }
  public login() {
    this.markFormGroupTouched(this.formData);
    if (this.formData.valid) {
      this.loading = true;
      const form: URLSearchParams = this.getFormData(this.formData.value);
      this.authService.login(form.toString()).subscribe((data: any) => {
        this.saveAndValidate(data);
      }, error => {
        this.loading = false;
        if (error.error.error_description === 'Invalid user credentials') {
          this.toast.showError('Alerta', 'Usuario o contraseña incorrecta');
          return;
        }
        if (error.error.error_description === 'Account is not fully set up') {
          this.toast.showError('Alerta', 'Usuario no verificado');
          this.validatedUser = true;
          this.sendEmail = false;
          return;
        }
        this.toast.showError('Alerta', 'Error al conectar al servidor');
      });
    } else {
      this.toast.showWarning('Advertencia', 'Los datos del formulario no son válidos');
      return;
    }
  }

  // Guarda tokens y verifica wallet
  saveAndValidate(data) {
    localStorage.clear();
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('refresh_token', data.refresh_token);
    const idUser = this.authService.getUserIdLogin();
    const isPyme = this.authService.isExistRole(ROLE_PYME);
    const isTalent = this.authService.isExistRole(ROLE_TALENT);
    this.goPage();
    // if (isPyme || isTalent) {
    //   this.walletService.getUserById(idUser).subscribe(res => {
    //     this.user = res;
    //     if (this.user?.walletAddress) {
    //       this.goPage();
    //     } else
    //       this.displayWallet = false;
    //   }, (err) => {
    //     this.goPage();
    //   });
    // } else {

    // }
  }

  getInputType() {
    if (this.showPassword) {
      return 'text';
    }
    return 'password';
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
  }

  onClose() {
    this.validatedUser = false;
  }

  onSendEmail() {
    this.loadingSend = true;
    if (this.formEmail.valid) {
      this.authService.emailVerifier(this.formEmail.value.email).subscribe(res => {
        this.sendEmail = true;
        this.loadingSend = false;
        this.formEmail.reset();
      }, err => {
        this.sendEmail = true;
        this.loadingSend = false;
        this.formEmail.reset();
      });
    }
  }

  goPage() {
    this.loading = false;
    const isAdmin = this.authService.isExistRole(ROLE_ADMIN);
    const isPyme = this.authService.isExistRole(ROLE_PYME);
    const isTalent = this.authService.isExistRole(ROLE_TALENT);
    if (isAdmin)
      this.router.navigate(['/app/admin/user']);
    if (isTalent)
      this.router.navigate(['/app/talent/profile']);
    if (isPyme)
      this.router.navigate(['/app/pyme/dashboard']);
  }

  onSuccessWallet() {
    this.displayWallet = false;
    this.goPage();
  }

  onCloseWallet() {
    this.goPage();
    this.displayWallet = false;
  }
  /**
   * Valida si ya inicio sesión
   */
  isAuth() {
    if (localStorage.getItem('access_token')) {
      this.goPage();
    }
  }
}
