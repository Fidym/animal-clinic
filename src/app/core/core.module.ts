import { PetsRoutingModule } from './../pets/pets-routing.module';
import { AppRoutingModule } from './../app-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClarityModule } from '@clr/angular';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    SidenavComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    PetsRoutingModule,
    RouterModule,
    ClarityModule
  ],
  exports: [
    HeaderComponent,
    SidenavComponent,
    AppRoutingModule,
  ]
})
export class CoreModule { }
