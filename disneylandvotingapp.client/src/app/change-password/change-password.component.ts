
import { Component } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { PasswordValidators } from './password.validators';

@Component({
  selector: 'pwd-change',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent {
  form1: FormGroup;

  constructor(fb: FormBuilder) {
    this.form1 = fb.group({
      'oldPwd': ['', Validators.required, PasswordValidators.shouldBe1234],
      'newPwd': ['', Validators.required],
      'confirmPwd': ['', Validators.required]
    }, {
      validator: PasswordValidators.matchPwds
    });
  }

  get oldPwd() {
    return this.form1.get('oldPwd');
  }

  get newPwd() {
    return this.form1.get('newPwd');
  }

  get confirmPwd() {
    return this.form1.get('confirmPwd');
  }
}
