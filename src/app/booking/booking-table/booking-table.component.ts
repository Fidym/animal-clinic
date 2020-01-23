import { Subscription } from 'rxjs';
import { Appointment } from './../appointment.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookingService } from '../booking.service';
import { DoctorService } from 'src/app/doctors/doctor.service';
import { Doctor } from 'src/app/doctors/doctor.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';

@Component({
  selector: 'app-booking-table',
  templateUrl: './booking-table.component.html',
  styleUrls: ['./booking-table.component.css']
})
export class BookingTableComponent implements OnInit, OnDestroy {

  appointments: Appointment[] = [];
  subcriptionAppointments: Subscription;

  doctors: Doctor[];
  subcriptionDoctors: Subscription;

  isLoading = false;

  constructor(private bookingService: BookingService,
              private doctorService: DoctorService,
              private dataService: DataStorageService) { }

  ngOnInit() {
    this.isLoading = true;
    this.dataService.getDoctors();
    this.dataService.getAppointments();
    this.subcriptionDoctors = this.doctorService.doctorsChanged.subscribe(
      doctors => this.doctors = doctors
    );
    this.subcriptionAppointments = this.bookingService.appointmentsChanged.subscribe(
      (appointments: Appointment[]) => {
        for (const appointment of appointments) {
          if (appointment) {
            this.appointments.push(appointment);
          }
        }
        this.isLoading = false;
      }
    );
  }

  ngOnDestroy() {
    this.subcriptionAppointments.unsubscribe();
    this.subcriptionDoctors.unsubscribe();
  }

}
