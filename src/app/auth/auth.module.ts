import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { AppRoutingModule } from './../app-routing.module';
import { NgModule } from '@angular/core';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { FormsModule, ReactiveFormsModule,  } from '@angular/forms';
import { AdminComponent } from './admin/admin.component';
import { AuthComponent } from './auth.component';

@NgModule({
  declarations: [
    SignupComponent,
    SigninComponent,
    AdminComponent,
    AuthComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ClarityModule,
  ]
})
export class AuthModule { }
