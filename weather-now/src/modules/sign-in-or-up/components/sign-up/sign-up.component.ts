import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WnSpinnerService } from 'src/core/services/wn-spinner.service';
import { WnToastService } from 'src/core/services/wn-toast.service';
import { EMAIL_PATTERN } from 'src/modules/shared/configs/pattern.config';
import { do_Deep_Copy } from 'src/modules/shared/helpers/common.helper';
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
    this._getRegisteredDetailsIfAny();
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

  private _getRegisteredDetailsIfAny() {
    this._wnSpinnerService.showSpinner();
    this._sharedApiService.getSignUpDetailsFromCloud().subscribe({
      next: (response: any) => {
        this._wnSpinnerService.hideSpinner();
        this._wnToastService.showInfo('Received the Form Details.');
        if (response.email) {
          this._setValuesToTheForm(response);
        }
        if (response.addressList.length) {
          this._updateAddressToTheForm(response);
        }
      },
      error: (error: any) => {
        this._wnSpinnerService.hideSpinner();
        this._wnToastService.showInfo(
          'Error while retrieving the information.'
        );
        console.log(error);
      },
    });
  }

  private _setValuesToTheForm(formValue: any) {
    let temp = do_Deep_Copy(formValue);
    delete temp.key;
    delete temp.addressList;
    this.signUpFormGroup.patchValue(temp);
  }

  private _updateAddressToTheForm(formValue: any) {
    formValue.addressList.forEach((itr: any, ind: number) => {
      let addressListArray = this.signUpFormGroup.controls[
        'addressList'
      ] as FormArray;
      if (addressListArray.controls[ind]) {
        addressListArray.controls[ind].setValue(itr);
      } else {
        /* METHOD - 1 */
        this._initAddressForm();
        addressListArray.controls[ind].setValue(itr);

        /* METHOD - 2 */
        /* let address: FormGroup = this._formBuilder.group({
          addressLine1: [itr.addressLine1, [Validators.required]],
          addressLine2: [itr.addressLine2],
          city: [itr.city, [Validators.required]],
          state: [itr.state, [Validators.required]],
          country: [itr.country, [Validators.required]],
          zipCode: [itr.zipCode, [Validators.required]],
        });
        let formArray = this.signUpFormGroup.get('addressList') as FormArray;
        formArray.push(address); */

        /* METHOD - 3 */
        /* this._initAddressForm();
        addressListArray.controls[ind]
          .get('addressLine1')
          ?.setValue(itr.addressLine1);
        addressListArray.controls[ind]
          .get('addressLine2')
          ?.setValue(itr.addressLine2);
        addressListArray.controls[ind].get('city')?.setValue(itr.city);
        addressListArray.controls[ind].get('state')?.setValue(itr.state);
        addressListArray.controls[ind].get('country')?.setValue(itr.country);
        addressListArray.controls[ind].get('zipCode')?.setValue(itr.zipCode); */
      }
    });
  }

  /* FOR FORM VALIDATIONS ------- START */

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

  /* FOR FORM VALIDATIONS ------- END */
}
