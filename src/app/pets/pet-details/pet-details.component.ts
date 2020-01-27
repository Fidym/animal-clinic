import { Subscription } from 'rxjs';
import { DataStorageService } from './../../shared/data-storage.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Pet } from '../pet.model';
import { PetsService } from '../pets.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { HttpEvent } from '@angular/common/http';

@Component({
  selector: 'app-pet-details',
  templateUrl: './pet-details.component.html',
  styleUrls: ['./pet-details.component.css']
})
export class PetDetailsComponent implements OnInit, OnDestroy {


  pet: Pet;
  id: number;
  @Input() index: number;
  subscriptionData: Subscription;
  isLoading = false;


  constructor(private petsService: PetsService,
              private dataService: DataStorageService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.isLoading = true;
    this.subscriptionData = this.dataService.getPets().subscribe(() => {
      this.route.params.subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.pet = this.petsService.getPet(this.id);
          this.isLoading = false;
        }
      );
    });
  }

  onEdit() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onNewTreatment() {
    this.router.navigate(['/booking/new']);
  }

  onDelete() {
    this.petsService.deletePet(this.id);
    this.dataService.storePets().subscribe(
      (response: Pet[]) => {
        console.log(response);
    });
    this.router.navigate(['my-pets/view']);
  }

  ngOnDestroy(): void {
    if (this.subscriptionData) {
      this.subscriptionData.unsubscribe();
    }
  }
}
