import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingComponent } from './booking.component';
// import { MatDatepickerModule } from '@angular/material/datepicker';
// import {MatInputModule} from '@angular/material/input';
// import { MatNativeDateModule } from '@angular/material/core';
import { MaterialModule } from '../shared/material-module';
import { ClarityModule } from '@clr/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookingTableComponent } from './booking-table/booking-table.component';
import { AppRoutingModule } from '../app-routing.module';
import { NewBookingComponent } from './new-booking/new-booking.component';

@NgModule({
  declarations: [BookingComponent, BookingTableComponent, NewBookingComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    ClarityModule,
  ]
})
export class BookingModule { }
