import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorsRoutingModule } from './doctors-routing.module';
import { DoctorsComponent } from './doctors.component';
import { ClarityModule } from '@clr/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { DoctorItemComponent } from './doctor-list/doctor-item/doctor-item.component';
import { DoctorDetailsComponent } from './doctor-details/doctor-details.component';
import { DoctorEditComponent } from './doctor-edit/doctor-edit.component';

@NgModule({
  declarations: [
    DoctorsComponent,
    DoctorListComponent,
    DoctorItemComponent,
    DoctorDetailsComponent,
    DoctorEditComponent
  ],
  imports: [
    CommonModule,
    ClarityModule,
    FormsModule,
    ReactiveFormsModule,
    DoctorsRoutingModule
  ]
})
export class DoctorsModule { }
