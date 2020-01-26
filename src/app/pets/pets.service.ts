import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { take, switchMap, tap } from 'rxjs/operators';
import { Pet } from './pet.model';
import { Treatment } from '../shared/treatment.model';

@Injectable({
  providedIn: 'root'
})
export class PetsService {

  constructor() { }

  public categoryArray: string[] = [
    'exotic',
    'large',
    'small',
    'wildlife',
    'other'
  ];

  public treatmentArray: string[] = [
  'Microchipping',
  'Parasite prevention and detecion',
  'Annual vaccine',
  'Wellness center',
  'Clinic service',
  'other'
  ];

  petsChanged = new Subject<Pet[]>();
  // Subject is an Observable that can start emitting events before you subscribe
  // Subjects, unlike Observables, share their work with all subscribers


  public pets: Pet[] = [
    new Pet(
      'Sanyi',
      'https://i.ytimg.com/vi/bDmghY9Kbt4/hqdefault.jpg',
      'small',
      12,
      'Has very nice eyes.',
      [
        new Treatment('Microchipping', '2019-01-01'),
        new Treatment('Parasite prevention and detecion', '2019-01-02'),
        new Treatment('Annual vaccine', '2019-01-03'),
      ],
      'master',
    ),
    new Pet(
      'Drogon',
      'https://vignette.wikia.nocookie.net/gameofthrones/images/8/8f/DrogonWinterfell8x01.PNG/revision/latest?cb=20190515233534',
      'exotic',
      7,
      'Eats two cows a day.',
      [
        new Treatment('Wellness center', '2019-01-01'),
        new Treatment('Clinic service', '2019-01-02'),
      ],
      'master',
    )
  ];

  setPets(pets: Pet[]) {
    this.pets = pets;
    this.petsChanged.next(this.pets.slice());
  }

  // a slice function-nek köszönhetően nem lehet kívülről direkt hozzáférni az array-hez
  // de ezáltal a getPets nem az eredeti recipes arrayt adja eredményül hanem egy copy-t

  getPets() {
    return this.pets.slice();
  }

  getPet(index: number) {
    return this.pets[index];
  }

  addPet(pet: Pet) {
    this.pets.push(pet);
    this.petsChanged.next(this.pets.slice());
  }


  deletePet(index: number) {
    this.pets.splice(index, 1);
    this.petsChanged.next(this.pets.slice());
  }

  updatePet(index: number, newPet: Pet) {
    this.pets[index] = newPet;
    this.petsChanged.next(this.pets.slice());
  }

  addTreatment(treatedPet: Pet, newTreament: Treatment) {
    for (const pet of this.pets) {
      if (pet.name === treatedPet.name && pet.userId === treatedPet.userId) {
        pet.treatments.push(newTreament);
      }
      this.petsChanged.next(this.pets.slice());
    }
  }
}

