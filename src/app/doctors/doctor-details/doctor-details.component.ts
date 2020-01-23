import { DoctorService } from './../doctor.service';
import { Component, OnInit, Input } from '@angular/core';
import { Doctor } from '../doctor.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.css']
})
export class DoctorDetailsComponent implements OnInit {

  doctor: Doctor;
  id: number;
  @Input() index: number;

  constructor(private doctorService: DoctorService,
              private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.doctor = this.doctorService.getDoctor(this.id);
      }
    );
    // console.log(this.doctor.treatments);
  }

  onEdit() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDelete() {
    this.doctorService.deleteDoctor(this.id);
    this.router.navigate(['../'], {relativeTo: this.route});
  }


}
