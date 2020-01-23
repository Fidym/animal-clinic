import { Appointment } from './appointment.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  public appointments: Appointment[] = [];
  public appointmentsChanged = new Subject<Appointment[]>();

  constructor() { }

  setAppointments(appointments: Appointment[]) {
    this.appointments = appointments;
    this.appointmentsChanged.next(this.appointments.slice());
  }

  getAppointments() {
    return this.appointments.slice();
  }

  public addAppointment(appoitnment: Appointment) {
    this.appointments.push(appoitnment);
    this.appointmentsChanged.next(this.appointments.slice());
    console.log(this.appointments);
  }

}
