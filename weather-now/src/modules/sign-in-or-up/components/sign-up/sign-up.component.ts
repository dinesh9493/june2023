import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EMAIL_PATTERN } from 'src/modules/shared/configs/pattern.config';

@Component({
  selector: 'wn-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  public signUpFormGroup: FormGroup = new FormGroup({});
  public isSubmitClicked: boolean = false;

  get addressListFormArray() {
    return this.signUpFormGroup.controls['addressList'] as FormArray;
  }

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this._initSignUpForm();
  }

  public submit() {
    this.isSubmitClicked = true;
    console.log(this.signUpFormGroup);
  }

  public addMoreAddress() {
    this._initAddressForm();
  }

  private _initSignUpForm() {
    this.signUpFormGroup = this._formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(EMAIL_PATTERN),
        ],
      ],
      contactNumber: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      martialStatus: ['', [Validators.required]],
      addressList: this._formBuilder.array([]),
    });
    this._initAddressForm();
    console.log(this.signUpFormGroup);
  }

  private _initAddressForm() {
    let address: FormGroup = this._formBuilder.group({
      addressLine1: ['', [Validators.required]],
      addressLine2: [''],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      country: ['', [Validators.required]],
      zipCode: ['', [Validators.required]],
    });
    let formArray = this.signUpFormGroup.get('addressList') as FormArray;
    formArray.push(address);
  }

  get firstNameRequiredValidation() {
    let isValid = false;
    if (this.signUpFormGroup.controls['firstName'].errors?.['required']) {
      isValid = true;
    }
    return isValid;
  }

  get lastNameRequiredValidation() {
    let isValid = false;
    if (this.signUpFormGroup.controls['lastName'].errors?.['required']) {
      isValid = true;
    }
    return isValid;
  }

  get emailRequiredValidation() {
    let isValid = false;
    if (this.signUpFormGroup.controls['email'].errors?.['required']) {
      isValid = true;
    }
    return isValid;
  }

  get emailPatternValidation() {
    let isValid = false;
    if (this.signUpFormGroup.controls['email'].errors?.['pattern']) {
      isValid = true;
    }
    return isValid;
  }
}
