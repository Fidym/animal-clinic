import { Component, OnInit, Input } from '@angular/core';
import { NgForm, ValidatorFn, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

function passwordMatchValidator(password: string): ValidatorFn {
  return (control: FormControl) => {
    // console.log(control);
    if (!control || !control.parent) {
      return null;
    }
    return control.parent.get(password).value === control.value ? null : { mismatch: true };
  };
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;

  constructor(private authService: AuthService,
              private fb: FormBuilder) {
                this.signUpForm = this.fb.group({
                  email: ['', [
                    Validators.required,
                    Validators.minLength(6),
                  ]],
                  password: ['', [
                    Validators.required,
                    Validators.minLength(6),
                    Validators.maxLength(12)
                  ]],
                  confirmPassword: ['', [
                    Validators.required,
                    Validators.minLength(6),
                    Validators.maxLength(12),
                    passwordMatchValidator('password')
                  ]]
                });
               }

  ngOnInit() {
  }

  onSignUp(form: NgForm) {
    const email = form.value.email;
    console.log(form.value.email);
    const password = form.value.password;
    this.authService.signUpUser(email, password);
  }


}
