import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EMAIL_PATTERN } from 'src/modules/shared/configs/pattern.config';

@Component({
  selector: 'wn-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public loginFormGroup: FormGroup = new FormGroup({});
  public isSubmitClicked: boolean = false;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this._initiateLoginForm();
  }

  private _initiateLoginForm() {
    this.loginFormGroup = this._formBuilder.group({
      emailFormControl: [
        '',
        [Validators.required, Validators.pattern(EMAIL_PATTERN)],
      ],
      passwordFormControl: ['', [Validators.required]],
    });
    console.log(this.loginFormGroup);
  }

  public submit() {
    this.isSubmitClicked = true;
    console.log(this.loginFormGroup);
  }
}
