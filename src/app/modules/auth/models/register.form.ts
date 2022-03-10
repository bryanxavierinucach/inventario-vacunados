import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Injectable, Injector } from '@angular/core';

@Injectable()
export class RegisterForm {

  public getForm(create_user) {
    return new FormGroup({
      username: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      password: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      firstName: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      email: new FormControl('', [Validators.required, Validators.maxLength(15)]),
      group: new FormControl('', [Validators.required, Validators.maxLength(15)]),
    });
  }

}
