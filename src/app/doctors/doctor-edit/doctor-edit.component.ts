import { Doctor } from './../doctor.model';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { DoctorService } from '../doctor.service';
import { AuthService } from 'src/app/auth/auth.service';
import { HttpEvent } from '@angular/common/http';

@Component({
  selector: 'app-doctor-edit',
  templateUrl: './doctor-edit.component.html',
  styleUrls: ['./doctor-edit.component.css']
})
export class DoctorEditComponent implements OnInit {

  doctorForm: FormGroup;
  id: number;
  editMode = false;

  constructor(private route: ActivatedRoute,
              private doctorService: DoctorService,
              private router: Router,
              private dataService: DataStorageService,
              private authService: AuthService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
        console.log('Edit mode:' + this.editMode);
      }
    );
  }




  private initForm() {
    let doctorName = '';
    let doctorTitle = '';
    let doctorImagePath = '';
    let doctorCategory = new FormArray([]);
    let doctorDescription = new FormArray([]);

    if (this.editMode) {
      const doctor =  this.doctorService.getDoctor(this.id);
      doctorName = doctor.name;
      doctorTitle = doctor.title;
      doctorImagePath = doctor.imagePath;
      if (doctor.category) {
        for (let category of doctor.category) {
          doctorCategory.push(
              new FormControl(category, Validators.required)
          );
        }
      }
      if (doctor.descriptionArray) {
        for (let description of doctor.descriptionArray) {
          doctorDescription.push(
              new FormControl(description)
          );
        }
      }
    }

    this.doctorForm = new FormGroup({
      name : new FormControl(doctorName, Validators.required),
      title : new FormControl(doctorTitle, Validators.required),
      imagePath : new FormControl(doctorImagePath),
      category : doctorCategory,
      description : doctorDescription,
    });
  }

  // Doctor {
  //   name: string;
  //   imagePath: string;
  //   category: [string];
  //   title: string;
  //   descriptionArray: [string];
  //   userId: string;
  // }

  onSubmit() {
    const newdoctor = new Doctor(
      this.doctorForm.value['name'],
      this.doctorForm.value['title'],
      this.doctorForm.value['imagePath'],
      this.doctorForm.value['category'],
      this.doctorForm.value['description'],
      this.authService.getUserId()
      );
    console.log(newdoctor);
    if (this.editMode) {
      this.doctorService.updateDoctor(this.id, newdoctor);
    } else {
      this.doctorService.addDoctor(newdoctor);
    }
    this.dataService.storeDoctors().subscribe(
      (response: HttpEvent<Object>) => {
        return console.log(response);
      }
    );
    this.doctorForm.reset();
    this.editMode = false;
    this.router.navigate(['./doctors/view']);
  }

  onCancel() {
    this.doctorForm.reset();
    this.editMode = false;
    this.router.navigate(['./doctors/view']);

  }

  onXcategory(index: number) {
    (this.doctorForm.get('category') as FormArray).removeAt(index);
  }
  onXdescription(index: number) {
    (this.doctorForm.get('description') as FormArray).removeAt(index);
  }

  getControlsDescription() {
    return (this.doctorForm.get('description') as FormArray).controls;
  }
  getControlsCategory() {
    return (this.doctorForm.get('category') as FormArray).controls;
  }

  onAddCategory() {
    (this.doctorForm.get('category') as FormArray).push(
        new FormControl(null, Validators.required)
    );
  }
  onAddDescription() {
    (this.doctorForm.get('description') as FormArray).push(
      new FormControl(null, Validators.required),
    );
  }

}
