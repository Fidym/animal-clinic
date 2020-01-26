import { Component, OnInit, Input } from '@angular/core';
import { Doctor } from '../../doctor.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-doctor-item',
  templateUrl: './doctor-item.component.html',
  styleUrls: ['./doctor-item.component.css']
})
export class DoctorItemComponent implements OnInit {

  @Input() doctor: Doctor;
  @Input() index: number;


  constructor(private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {

  }

  onMoreInfo() {
    this.router.navigate(['../', this.index], {relativeTo: this.route});
  }

  onBookAppointment() {
    this.router.navigate(['/booking/new']);
  }

}
