import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Country } from '../validators/country.model';
import { ParentErrorStateMatcher, PasswordValidator } from '../validators/password.validator';
import { PhoneValidator } from '../validators/phone.validator';

@Component({
  selector: 'app-forms-page',
  templateUrl: './userdetail.html',
  styleUrls: ['./userdetail.scss']
})
export class FormsComponent implements OnInit {

  userDetailsForm: FormGroup ;

  matchingPasswordsGroup: FormGroup;
  countryPhoneGroup: FormGroup;

  parentErrorStateMatcher = new ParentErrorStateMatcher();

  genders = [
    "Male",
    "Female",
    "Other"
  ];

  countries = [
    new Country('UY', 'Uruguay'),
    new Country('US', 'United States'),
    new Country('AR', 'Argentina')
  ];
    
  constructor(private fb: FormBuilder) {

     // country & phone validation
    let country = new FormControl(this.countries[0], Validators.required);

    let phone = new FormControl('', {
      validators: Validators.compose([
        Validators.required,
        PhoneValidator.validCountryPhone(country)
      ])
    });

    this.countryPhoneGroup = new FormGroup({
      country: country,
      phone: phone
    });

 // user details form validations
 this.userDetailsForm = this.fb.group({
  fullname: ['', Validators.required ],
  bio: ["", Validators.maxLength(256)],
  birthday: ['', Validators.required],
  gender: new FormControl(this.genders[0], Validators.required),
  countryPhone: this.countryPhoneGroup,
  email: new FormControl('', Validators.compose([
    Validators.required,
    Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
  ])),
});

}

  ngOnInit() {
    
  }
  

  onSubmitUserDetails(value: any){
    console.log(value);
  }

}
