import { Doctor } from './doctor.model';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  constructor() { }

  doctorsChanged = new Subject<Doctor[]>();
  // Subject is an Observable that can start emitting events before you subscribe
  // Subjects, unlike Observables, share their work with all subscribers

  // public name: string;
  // public imagePath: string;
  // public category: string;
  // public description: string;
  // public userId: string;

  public doctors: Doctor[] = [];

  setDoctors( doctors: Doctor[]) {
    this.doctors = doctors;
    this.doctorsChanged.next(this.doctors.slice());

  }

  // a slice function-nek köszönhetően nem lehet kívülről direkt hozzáférni az array-hez
  // de ezáltal a getdoctors nem az eredeti recipes arrayt adja eredményül hanem egy copy-t

  getDoctors() {
    return this.doctors.slice();
  }

  getDoctor(index: number) {
    return this.doctors[index];
  }

  addDoctor(doctor: Doctor) {
    this.doctors.push(doctor);
    this.doctorsChanged.next(this.doctors.slice());
    console.log(this.doctors);
  }

  deleteDoctor(index: number) {
    this.doctors.splice(index, 1);
    this.doctorsChanged.next(this.doctors.slice());
  }

  updateDoctor(index: number, newDoc: Doctor) {
    this.doctors[index] = newDoc;
    this.doctorsChanged.next(this.doctors.slice());
  }

}
