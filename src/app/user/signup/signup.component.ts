import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from "@angular/router";

import { environment } from '../../../environments/environment';

import { CommonService } from '../../shared/common.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    login_form: FormGroup;
    email: FormControl;
    password: FormControl;
    loginEmail: FormControl;
    loginPassword: FormControl;
    fullName: FormControl;
    address: FormControl;
    city: FormControl;
    contact_no: FormControl;

    constructor(
        private common_service: CommonService,
        private router: Router
    ) { }

    ngOnInit() {
        this.createSignFormControl();
        this.createSignForm();
    }

    /**
     * Function will create login form control and set validation rules
     */
    protected createSignFormControl() {
        this.loginEmail = new FormControl('', [
            Validators.required,
            Validators.email,
            Validators.pattern(environment.emailValidRegx)
        ]);
        this.loginPassword = new FormControl('', [Validators.required, Validators.pattern(/\S/)]);
        this.fullName = new FormControl('', Validators.required);
        this.address = new FormControl('');
        this.city = new FormControl('');
        this.contact_no = new FormControl('');
    }

    /**
     * Function will create form group for Login Form
     */
    protected createSignForm() {
        this.login_form = new FormGroup({
            loginEmail: this.loginEmail,
            loginPassword: this.loginPassword,
            fullName: this.fullName,
            address: this.address,
            city: this.city,
            contact_no: this.contact_no
        });
    }

    /**
     * Function is used to make API call of SIGNUP API
     * username or email and password both data are sending in headers
     * @param form,NgForm,To get form data of Login Form
     * 
     * @return Authkey,String,It will be used to authenticate user of each and every API call 
     */
    signup(form) {
        if(this.login_form.valid){
            let fullNameArray = form.value.fullName.split(" ");
            let lastNameArray = fullNameArray.slice(1);
            
            let signupData = {
                "first_name":fullNameArray[0],
                "last_name":lastNameArray.join(" "),
                "email":form.value.loginEmail,
                "password":form.value.loginPassword,
                "address":form.value.address,
                "city":form.value.city,
                "contact_no":form.value.contact_no,
                "admin_panel":true
            };
            this.common_service.makePostRequest('user/signup',signupData).subscribe(
                (response:any) => {
                    let msg = response;
                    this.router.navigate([
                        "/"
                    ]);
                },
                (error) => {
                    console.log(error);
                }
            );
        } else {
            if(this.login_form.hasError("required",["fullName"]) == true) {
                return false;
            }
            if(this.login_form.hasError("required",["loginEmail"]) == true || this.login_form.hasError("pattern",["loginEmail"]) ) {
                return false;
            }
            if(this.login_form.hasError("required",["loginPassword"]) == true || this.login_form.hasError("minlength",["loginPassword"]) == true || this.login_form.hasError("maxlength",["loginPassword"]) == true || this.login_form.hasError("pattern",["loginPassword"]) == true) {
            }
        }
    }

}
