import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Pet } from 'src/app/pets/pet.model';
import { Subscription } from 'rxjs';
import { Doctor } from 'src/app/doctors/doctor.model';
import { PetsService } from 'src/app/pets/pets.service';
import { DoctorService } from 'src/app/doctors/doctor.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Router } from '@angular/router';
import { BookingService } from '../booking.service';
import { Appointment } from '../appointment.model';
import { HttpEvent } from '@angular/common/http';
import { Treatment } from 'src/app/shared/treatment.model';

@Component({
  selector: 'app-new-booking',
  templateUrl: './new-booking.component.html',
  styleUrls: ['./new-booking.component.css']
})
export class NewBookingComponent implements OnInit, OnDestroy {


  bookingForm: FormGroup;
  pet: Pet;
  pets: Pet[] = [];
  subscriptionPet: Subscription;
  userId: string;
  doctors: Doctor[] = [];

  bookedAppointments: Appointment[] = [];
  subscriptionAppiointments: Subscription;

  constructor(private petsService: PetsService,
              private doctorService: DoctorService,
              private dataService: DataStorageService,
              private authService: AuthService,
              private router: Router,
              private bookingService: BookingService) { }

  ngOnInit() {
    this.initForm();
    this.dataService.getPets();
    this.dataService.getDoctors();
    this.dataService.getAppointments();

    this.userId = this.authService.getUserId();
    this.subscriptionPet = this.petsService.petsChanged.subscribe(
      (pets: Pet[]) => {
        for (const pet of pets) {
          if (pet.userId === this.userId || this.authService.isAdmin) {
            this.pets.push(pet);
          }
        }
        console.log(this.pets);
      }
    );

    this.subscriptionAppiointments = this.bookingService.appointmentsChanged.subscribe(
      appointments => this.bookedAppointments = appointments
    );
  }

  private initForm() {
    let petName = '';
    let doctorName = '';
    let appointmentDate = new Date();
    let treatment = '';
    let note = '';

    this.bookingForm = new FormGroup({
      petName : new FormControl(petName, Validators.required),
      doctorName : new FormControl(doctorName, Validators.required),
      appointmentDate: new FormControl(appointmentDate, Validators.required),
      treatment: new FormControl(treatment, Validators.required),
      note: new FormControl(note),

    });
  }


  selectedPet(petName: string) {
    let category: string;
    for (const pet of this.pets) {
      if (pet.name === petName) {
        category = pet.category;
        this.doctors = this.doctorFilter(this.doctorService.getDoctors(), category);
        this.pet = pet;
      }
    }
  }

  doctorFilter(doctors: Doctor[], category: string) {
    const doctorsModif: Doctor[] = [];
    for (const doctor of doctors) {
      if (doctor.category.includes(category)) {
        doctorsModif.push(doctor);
      }
    }
    return doctorsModif;
  }

  // Prevent Booked days, Saturday and Sunday from being selected.
  dateFilter = (d: Date): boolean => {
    const day = d.getDay();
    const time = d.getTime();
    const blockedDays: number[] = [];
    const selectedDoctor: string = this.bookingForm.get('doctorName').value;
    if (selectedDoctor) {
      for (const appointment of this.bookedAppointments) {
        if (appointment && appointment.doctorName === selectedDoctor) {
          const blocked = new Date(appointment.date);
          blockedDays.push(blocked.getTime());
        }
      }
      return day !== 0 && day !== 6 && !blockedDays.includes(time);
    } else {
      return false;
    }
  }

  formatDate(date: Date) {
    const year = date.getFullYear();

    let month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;

    let day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;

    return month + '/' + day + '/' + year;
  }

  onSubmit() {
    const newAppointment = new Appointment(
      this.bookingForm.value['treatment'],
      this.bookingForm.value['appointmentDate'],
      this.bookingForm.value['petName'],
      this.authService.getUserId(),
      this.bookingForm.value['doctorName'],
      this.bookingForm.value['note']
    );

    this.bookingService.addAppointment(newAppointment);
    this.dataService.storeAppointments().subscribe(
      (response: HttpEvent<Object>) => {
        return console.log(response);
      }
    );

    const newTreatment = new Treatment(
      this.bookingForm.value['treatment'],
      this.formatDate(this.bookingForm.value['appointmentDate'])
    );

    this.petsService.addTreatment(this.pet, newTreatment);
    this.dataService.storePets().subscribe(
      (response: HttpEvent<Object>) => {
        return console.log(response);
      }
    );

    this.bookingForm.reset();
    this.router.navigate(['./']);
  }

  onCancel() {
    this.bookingForm.reset();
    this.router.navigate(['./']);

  }

  ngOnDestroy(): void {
   this.subscriptionPet.unsubscribe();
   this.subscriptionAppiointments.unsubscribe();
  }
}
