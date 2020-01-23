import { Observable, Subscription } from 'rxjs';
import { Pet } from './../../pets/pet.model';
import { DoctorService } from './../../doctors/doctor.service';
import { AuthService } from './../../auth/auth.service';
import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Doctor } from 'src/app/doctors/doctor.model';
import { PetsService } from 'src/app/pets/pets.service';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit, OnDestroy {

  showPetSideNav = false;
  showDoctorSideNav = false;
  url: string;
  doctors: Doctor[];
  pets: Pet[];
  userId: string;
  subscriptionRoute: Subscription;
  subscriptionPet: Subscription;
  subscriptionDoctor: Subscription;
  subscriptionUserId: Subscription;

  isPetRoute(value: string): boolean {
    return /^\/my-pets(\/|$)/.test(value);
  }

  isDoctorRoute(value: string): boolean {
    return /^\/doctors(\/|$)/.test(value);
  }
  isBookingRoute(value: string): boolean {
    return /^\/booking(\/|$)/.test(value);
  }

  constructor(public authService: AuthService,
              public doctorService: DoctorService,
              public petService: PetsService,
              public router: Router) {
        this.subscriptionRoute = this.router.events
          .pipe(filter(event => event instanceof NavigationEnd))
          .subscribe((url: NavigationEnd) => {
            this.url = url.url;
                });
  }

  ngOnInit() {
    this.subscriptionPet = this.petService.petsChanged.subscribe(
      (pets: Pet[]) => {
        // for (let pet of pets) {
        //   if (pet.userId === this.userId) {
        //     this.pets.push(pet);
        //   }
        // }
        this.pets = pets;
      }
    );
    this.subscriptionDoctor = this.doctorService.doctorsChanged.subscribe(
      (doctors: Doctor[]) => {
        this.doctors = doctors;
      }
    );
    this.subscriptionUserId = this.authService.userId.subscribe(
      uid => this.userId = uid
    );
    // this.userId = this.authService.getUserId();
    console.log(this.userId);
  }



  ngOnDestroy() {
     this.subscriptionRoute.unsubscribe();
     this.subscriptionPet.unsubscribe();
     this.subscriptionDoctor.unsubscribe();
     this.subscriptionUserId.unsubscribe();
  }

}
