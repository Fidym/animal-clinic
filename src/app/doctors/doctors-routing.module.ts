import { AdminGuard } from './../auth/admin/admin.guard';
import { DoctorEditComponent } from './doctor-edit/doctor-edit.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DoctorsComponent } from './doctors.component';
import { DoctorListComponent } from './doctor-list/doctor-list.component';
import { DoctorDetailsComponent } from './doctor-details/doctor-details.component';

const routesDocs: Routes = [
  {
  path: 'doctors',
  component: DoctorsComponent,
  children : [
    { path: 'view', component: DoctorListComponent },
    { path: 'add-doctor', component: DoctorEditComponent, canActivate: [AdminGuard] },
    { path: ':id', component: DoctorDetailsComponent  },
    { path: ':id/edit', component: DoctorEditComponent, canActivate: [AdminGuard]  },
  ]
 }
];

@NgModule({
  imports: [RouterModule.forChild(routesDocs)],
  exports: [RouterModule]
})
export class DoctorsRoutingModule { }
