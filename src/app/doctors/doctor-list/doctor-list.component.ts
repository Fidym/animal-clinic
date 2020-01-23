import { DataStorageService } from './../../shared/data-storage.service';
import { DoctorService } from './../doctor.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Doctor } from '../doctor.model';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.css']
})
export class DoctorListComponent implements OnInit, OnDestroy {

  doctors: Doctor[];
  isLoading = false;
  subscrionDoctors: Subscription;


  constructor(private doctorsService: DoctorService,
              private router: Router,
              private route: ActivatedRoute,
              private dataStore: DataStorageService,
              private authService: AuthService,
              ) { }

  ngOnInit() {
    this.isLoading = true;
    this.dataStore.getDoctors();
    this.subscrionDoctors = this.doctorsService.doctorsChanged.subscribe(
      (doctors: Doctor[]) => {
        this.doctors = doctors;
        this.isLoading = false;
      }
    );
  }

  onNewdoctor() {
    this.router.navigate(['./add-doctor'], {relativeTo: this.route});
  }

  ngOnDestroy() {
    this.subscrionDoctors.unsubscribe();
  }

}
