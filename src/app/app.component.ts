import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { CustomRegex } from './shared/const/validationpatterns';
import { NoSpaceValidator } from './shared/validators/nospacebar';
import { EmpValidator } from './shared/validators/empValidator';
import { COUNTRIES_META_DATA } from './shared/const/countriesData';
import { Icountry } from './shared/models/country.interface';
import { AsynEmailValidator } from './shared/validators/asyncEmailValidator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  signUpForm!: FormGroup;
  title = 'reactiveForms';
  countryArr: Array<Icountry> = COUNTRIES_META_DATA;


  showPassword : boolean =false;
  showPasswordConfirm:boolean=false;

  genderArr: Array<string> = ['female', 'male', 'others'];
  ngOnInit(): void {
    this.createSignUpForm();
    this.currAddPerAddSameChkBoxEnableDisable();
    this.patchPermanentAdd();
    this.confirmPassHandeler();
    this.validateConfirmPass();
  }

  validateConfirmPass(){
    this.signUpForm.get('confirmPass')
    ?.valueChanges
    .subscribe(res=>{
      if(this.f['password'].value !== res){
        this.signUpForm.get('confirmPass')?.setErrors({invalid : true});
      }
      else{
        this.signUpForm.get('confirmPass')?.setErrors(null);
      }
    })
  }

  confirmPassHandeler() {
    this.signUpForm.get('password')
    ?.valueChanges
    .subscribe(res => {
      if (this.signUpForm.get('password')?.valid) {
        this.signUpForm.get('confirmPass')?.enable();
      } else {
        this.signUpForm.get('confirmPass')?.disable();
      }
    });
  }

  
  currAddPerAddSameChkBoxEnableDisable() {
    this.signUpForm.get('currentAddress')?.valueChanges.subscribe((res) => {
      // console.log(res);
      // console.log(this.signUpForm.get('currentAddress')?.valid);

      if(this.signUpForm.get('currentAddress')?.valid) {
        this.f['isAddSame'].enable();
      } else {
        this.f['isAddSame'].disable();
        this.f['isAddSame'].patchValue(false);
      }
    });
  }

  // currAddPerAddSameChkBox_Chk_Unchk_Functionality

  patchPermanentAdd() {
    this.f['isAddSame'].valueChanges.subscribe((res) => {
      if (res) {
        this.f['permanentAddress']?.patchValue(this.f['currentAddress'].value);
        this.f['permanentAddress'].disable();
        // this.signUpForm.get('permanentAddress')?.patchValue(this.signUpForm.get('currentAddress')?.value);
        // this.signUpForm.get('permanentAddress')?.disable()
      } else {
        this.f['permanentAddress'].reset();
        this.f['permanentAddress'].enable();
        // this.signUpForm.get('permanentAddress')?.reset();
        // this.signUpForm.get('permanentAddress')?.enable();
      }
    });
  }

  createSignUpForm() {
    this.signUpForm = new FormGroup({
      username: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(12),
        Validators.pattern(CustomRegex.username),
        NoSpaceValidator.noSpace,
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.pattern(CustomRegex.email)
      ],AsynEmailValidator.isEmailAvailable),
      empId: new FormControl(null, [
        Validators.required,
        EmpValidator.isEmpValid,
      ]),
      gender: new FormControl('female', [Validators.required]),

      skills: new FormArray([new FormControl(null, [Validators.required])]),
      currentAddress: new FormGroup({
        country: new FormControl('India', [Validators.required]),
        state: new FormControl(null, [Validators.required]),
        city: new FormControl(null, [Validators.required]),
        zipcode: new FormControl(null, [
          Validators.maxLength(6),
          Validators.minLength(6),
          Validators.required,
        ]),
      }),
      permanentAddress: new FormGroup({
        country: new FormControl(null, [Validators.required]),
        state: new FormControl(null, [Validators.required]),
        city: new FormControl(null, [Validators.required]),
        zipcode: new FormControl(null, [Validators.required]),
      }),
      isAddSame: new FormControl({ value: false, disabled: true }),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern(CustomRegex.password),
      ]),
      confirmPass: new FormControl({ value: null, disabled: true }, Validators.required),
    });
  }

  onSignUp() {
    if(this.signUpForm.valid){
    console.log(this.signUpForm);
    // console.log(this.signUpForm.value);
    console.log(this.signUpForm.getRawValue());
      this.signUpForm.reset();
    }
  }

  get f() {
    return this.signUpForm.controls;
  }
  // to add validation in current address
  get currAddInnerFormGrp() {
    let formgrp = this.signUpForm.get('currentAddress') as FormGroup;
    return formgrp.controls;
  }

  get perAddInnerFormGrp() {
    let formgrp = this.signUpForm.get('permanentAddress') as FormGroup;
    return formgrp.controls;
  }
  get getUserName() {
    return this.signUpForm.get('username') as FormControl;
  }

  // when we use get we can use it as property
  get skillsFormArr() {
    return this.signUpForm.get('skills') as FormArray;
  }

  onSkillAdd() {
    if (this.skillsFormArr.length < 5) {
      let getSkillControl = new FormControl(null, [Validators.required]);
      this.skillsFormArr.push(getSkillControl);
    }
  }
  onSkillRemove(i: number) {
    this.skillsFormArr.removeAt(i);
    // removeAt method is method of FormArray of
  }
}
