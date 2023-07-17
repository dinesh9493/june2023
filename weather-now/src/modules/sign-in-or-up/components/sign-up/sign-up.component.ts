import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WnSpinnerService } from 'src/core/services/wn-spinner.service';
import { WnToastService } from 'src/core/services/wn-toast.service';
import { EMAIL_PATTERN } from 'src/modules/shared/configs/pattern.config';
import { SharedApiService } from 'src/modules/shared/services/shared-api.service';

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

  constructor(
    private _formBuilder: FormBuilder,
    private _sharedApiService: SharedApiService,
    private _wnSpinnerService: WnSpinnerService,
    private _wnToastService: WnToastService
  ) {}

  ngOnInit(): void {
    this._initSignUpForm();
  }

  public submit() {
    this.isSubmitClicked = true;
    if (this.signUpFormGroup.valid) {
      this._wnSpinnerService.showSpinner();
      this._sharedApiService
        .saveSignUpDetailsWithCloud(this.signUpFormGroup.value)
        .subscribe({
          next: (response: any) => {
            this._wnSpinnerService.hideSpinner();
            this._wnToastService.showSuccess('Successfully registered.');
          },
          error: (error: any) => {
            this._wnSpinnerService.hideSpinner();
            this._wnToastService.showError('Registration Failed.');
          },
        });
    }
  }

  public addMoreAddress() {
    this._initAddressForm();
  }

  private _initSignUpForm() {
    this.signUpFormGroup = this._formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(EMAIL_PATTERN)]],
      contactNumber: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      martialStatus: ['', []],
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

  public getAddressLine1Validation(i: number) {
    let formArray = this.signUpFormGroup?.controls['addressList'] as FormArray;
    let addressFormGroup = formArray.controls[i] as FormGroup;
    return addressFormGroup.controls['addressLine1'].errors?.['required'];
  }

  public getCityValidation(i: number) {
    let formArray = this.signUpFormGroup?.controls['addressList'] as FormArray;
    let addressFormGroup = formArray.controls[i] as FormGroup;
    return addressFormGroup.controls['city'].errors?.['required'];
  }

  public getStateValidation(i: number) {
    let formArray = this.signUpFormGroup?.controls['addressList'] as FormArray;
    let addressFormGroup = formArray.controls[i] as FormGroup;
    return addressFormGroup.controls['state'].errors?.['required'];
  }

  public getCountryValidation(i: number) {
    let formArray = this.signUpFormGroup?.controls['addressList'] as FormArray;
    let addressFormGroup = formArray.controls[i] as FormGroup;
    return addressFormGroup.controls['country'].errors?.['required'];
  }

  public getZipcodeValidation(i: number) {
    let formArray = this.signUpFormGroup?.controls['addressList'] as FormArray;
    let addressFormGroup = formArray.controls[i] as FormGroup;
    return addressFormGroup.controls['zipCode'].errors?.['required'];
  }
}
