import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { NgForm } from '@angular/forms';
import { NavigationExtras, Router, } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(public authService: AuthService,
              public router: Router,
              ) { }

  ngOnInit() {
  }

  onSignIn(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signInUser(email, password);

    // Redirect the user
    this.router.navigateByUrl(this.authService.redirectUrl);
    this.authService.redirectUrl = null;
  }

}
