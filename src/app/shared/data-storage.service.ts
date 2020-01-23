import { BookingService } from './../booking/booking.service';
import { DoctorService } from './../doctors/doctor.service';
import { AuthService } from './../auth/auth.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PetsService } from '../pets/pets.service';
import { Pet } from '../pets/pet.model';
import { map } from 'rxjs/operators';
import { Doctor } from '../doctors/doctor.model';
import { Appointment } from '../booking/appointment.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {


  constructor(private authService: AuthService,
              private http: HttpClient,
              private petService: PetsService,
              private doctorService: DoctorService,
              private bookingService: BookingService) { }

  storePets() {
    const token = this.authService.getToken();
    const url = 'https://animal-clinic-b523e.firebaseio.com/pets.json';
    return this.http.put(url,
                          this.petService.getPets(),
                          {
                          observe: 'body',
                          params: new HttpParams().set('auth', token)}
                          );
  }

  getPets() {
    const token = this.authService.getToken();
    this.http.get<Pet[]>('https://animal-clinic-b523e.firebaseio.com/pets.json?auth=' + token )
      .pipe(map(
        (pets) => {
          console.log(pets);
          for (const pet of pets) {
            if (!pet.treatments) {
              pet.treatments = [];
            }
          }
          return pets;
        }
      ))
      .subscribe((pets: Pet[]) =>
        this.petService.setPets(pets));
  }

  storeDoctors() {
    const token = this.authService.getToken();
    const url = 'https://animal-clinic-b523e.firebaseio.com/doctors.json';
    return this.http.put(url,
                          this.doctorService.getDoctors(),
                          {
                          observe: 'body',
                          params: new HttpParams().set('auth', token)}
                          );
  }

  getDoctors() {
    this.http.get<Doctor[]>('https://animal-clinic-b523e.firebaseio.com/doctors.json')
      .pipe(map(
        (doctors) => {
          console.log(doctors);
          return doctors;
        }
      ))
      .subscribe((doctors: Doctor[]) =>
        this.doctorService.setDoctors(doctors)
        );
  }

  getAppointments() {
    const token = this.authService.getToken();
    this.http.get<Appointment[]>('https://animal-clinic-b523e.firebaseio.com/appointments.json?auth=' + token )
      .pipe(map(
        (appointments) => {
          console.log(appointments);
          return appointments;
        }
      ))
      .subscribe((appointments: Appointment[]) =>
        this.bookingService.setAppointments(appointments));
  }

  storeAppointments() {
    const token = this.authService.getToken();
    const url = 'https://animal-clinic-b523e.firebaseio.com/appointments.json';
    return this.http.put(url,
                          this.bookingService.getAppointments(),
                          {
                          observe: 'body',
                          params: new HttpParams().set('auth', token)}
                          );
  }

}

