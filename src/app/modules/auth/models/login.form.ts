import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Injectable, Injector } from '@angular/core';

@Injectable()
export class LoginForm {

  public getForm() {
    return new FormGroup({
      username: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      password: new FormControl('', [Validators.required, Validators.maxLength(100)]),
      client_id: new FormControl('inventario-api'),
      grant_type: new FormControl('password'),
    });
  }

}
