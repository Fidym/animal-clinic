import { BookingTableComponent } from './booking/booking-table/booking-table.component';
import { BookingComponent } from './booking/booking.component';
import { AdminComponent } from './auth/admin/admin.component';
import { AdminGuard } from './auth/admin/admin.guard';
import { SigninComponent } from './auth/signin/signin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';
import { NewBookingComponent } from './booking/new-booking/new-booking.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'sign-up', component: SignupComponent },
  { path: 'sign-in', component: SigninComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard]},
  {
    path: 'booking',
    component: BookingComponent,
    canActivate: [AuthGuard],
    children : [
      { path: 'new', component: NewBookingComponent },
      { path: 'table', component: BookingTableComponent, canActivate: [AdminGuard] },
    ]
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
