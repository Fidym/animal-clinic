import { AuthService } from "./../../auth/auth.service";
import { Pet } from "./../pet.model";
import { PetsService } from "./../pets.service";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { DataStorageService } from "src/app/shared/data-storage.service";

@Component({
  selector: "app-pet-list",
  templateUrl: "./pet-list.component.html",
  styleUrls: ["./pet-list.component.css"]
})
export class PetListComponent implements OnInit, OnDestroy {
  pets: Pet[];
  subscriptionPet: Subscription;
  subscriptionData: Subscription;
  userId: string;
  isLoading = false;

  constructor(
    private petsService: PetsService,
    private router: Router,
    private route: ActivatedRoute,
    public authService: AuthService,
    private dataStore: DataStorageService
  ) {}

  ngOnInit() {
    console.log("Pet-list initialized");
    if (this.authService.authenticated) {
      this.isLoading = true;
      this.subscriptionData = this.dataStore.getPets().subscribe();
      this.subscriptionPet = this.petsService.petsChanged.subscribe(
        (pets: Pet[]) => {
          this.pets = pets;
          this.isLoading = false;
        }
      );
      this.userId = this.authService.getUserId();
    }
  }

  // petFilter(pets: Pet[], id: string) {
  //   for (let pet of pets) {
  //      if (pet.userId === id || pet.userId === 'master') {
  //       this.petsModif.push(pet);
  //       return this.petsModif;
  //     }
  //   }
  // }

  onNewPet() {
    this.router.navigate(["../add-pet"], { relativeTo: this.route });
  }

  ngOnDestroy() {
    if (this.subscriptionPet) {
      this.subscriptionPet.unsubscribe();
    }
    if (this.subscriptionData) {
      this.subscriptionData.unsubscribe();
    }
  }
}
