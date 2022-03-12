import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'app/@core/services/toast.service';
import { AuthService, JwtTokenService } from '../../services';

@Component({
  selector: 'ngx-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  public formData: FormGroup;
  public isLoaded: boolean;
  registrationForm: FormGroup;
  fieldTextType: boolean;
  repeatFieldTextType: boolean;
  loading = false;
  public token: any;
  public rol: any;
  public rolPyme: any;
  public rolTalent;
  public rolAdmin;
  public index: number;
  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: ToastService,
    private jwtTokenService: JwtTokenService,
    private fb: FormBuilder,

  ) { }

  ngOnInit(): void {
    this.formData = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });

    this.profile2();
  }

  public ChangePassword() {
    this.loading = true;
    try {
      const token: any = this.jwtTokenService.decodeToken(localStorage.getItem('access_token'));
      const userId = token.sub;
      if (this.formData.valid) {
        this.loading = true;
        this.authService.changePassword(this.formData.value, userId).subscribe(() => {
          this.loading = true;
          this.toast.showPrimary('Correcto', 'Tu contraseña fue cambiada con éxito, vuelve a ingresar con tu nueva contraseña');
          this.loading = true;
        }, err => {
          this.loading = false;
          this.toast.showError('Error', err.error.message);
        });
        this.authService.logout();
      }
    } catch (e) {
      this.toast.showError('ERROR', e);
      this.loading = false;
    }
  }

  toggleFieldTextType() {
    this.fieldTextType = !this.fieldTextType;
  }

  toggleRepeatFieldTextType() {
    this.repeatFieldTextType = !this.repeatFieldTextType;
  }

  profile2() {
    this.token = this.jwtTokenService.decodeToken(localStorage.getItem('access_token'));
    const nameRol = this.token['realm_access'].roles;
    for (const i of nameRol) {
      if (i === 'users') {
        this.rolTalent = 'users';
        this.index = 3;
      } else if (i === 'pyme') {
        this.rolPyme = 'pyme';
        this.index = 2;
      } else if (i === 'admin') {
        this.rolAdmin = 'admin';
        this.index = 1;
      }
    }
  }
}
