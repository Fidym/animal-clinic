import { AuthService } from 'src/app/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { PetsService } from '../pets.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';
import { HttpEvent } from '@angular/common/http';
import { Pet } from '../pet.model';

@Component({
  selector: 'app-pet-edit',
  templateUrl: './pet-edit.component.html',
  styleUrls: ['./pet-edit.component.css']
})
export class PetEditComponent implements OnInit {

  petForm: FormGroup;
  id: number;
  editMode = false;

  constructor(private route: ActivatedRoute,
              public petService: PetsService,
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

  private format(inputDate) {
      const date = new Date(inputDate);
      if (!isNaN(date.getTime())) {
          // Months use 0 index.
          return date.getMonth() + 1 + '/' + date.getDate() + '/' + date.getFullYear();
      }
  }

  private initForm() {
    let petName = '';
    let petAge: number;
    let petImagePath = '';
    let petCategory = 'small';
    let petDescription = '';
    const petTreatments =  new FormArray([]);

    if (this.editMode) {
      const pet =  this.petService.getPet(this.id);
      petName = pet.name;
      petAge = pet.age;
      petImagePath = pet.imagePath;
      petCategory = pet.category;
      petDescription = pet.description;
      if (pet.treatments) {
        for (const treatment of pet.treatments) {
          petTreatments.push(
            new FormGroup({
              name: new FormControl(treatment.name, Validators.required),
              date: new FormControl(this.format(treatment.date), Validators.required)
            })
          );
        }
      }
    }

    this.petForm = new FormGroup({
      name : new FormControl(petName, Validators.required),
      age : new FormControl(petAge, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
      imagePath : new FormControl(petImagePath),
      category : new FormControl(petCategory, Validators.required),
      description : new FormControl(petDescription),
      treatments : petTreatments,
    });
  }

  onSubmit() {
    console.log(this.petForm);
    const newPet = new Pet(
      this.petForm.value['name'],
      this.petForm.value['imagePath'],
      this.petForm.value['category'],
      this.petForm.value['age'],
      this.petForm.value['description'],
      this.petForm.value['treatments'],
      this.authService.getUserId()
      );
    if (this.editMode) {
      console.log('Edit mode = true');
      this.petService.updatePet(this.id, newPet);
    } else {
      this.petService.addPet(newPet);
    }
    this.dataService.storePets().subscribe(
      (response: Pet[]) => {
        console.log(response);
        this.petForm.reset();
        this.editMode = false;
        this.router.navigate(['./my-pets/view']);
      }
    );
  }

  onCancel() {
    this.petForm.reset();
    this.editMode = false;
    this.router.navigate(['./my-pets/view']);

  }

  onX(index: number) {
    (this.petForm.get('treatments') as FormArray).removeAt(index);
  }

  getControls() {
    return (this.petForm.get('treatments') as FormArray).controls;
  }

  onAddTreatment() {
    (this.petForm.get('treatments') as FormArray).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        date: new FormControl(null, Validators.required)
      })
    );
  }
}
