import { ClarityModule } from '@clr/angular';
import { PetEditComponent } from './pet-edit/pet-edit.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PetsComponent } from './pets.component';
import { PetListComponent } from './pet-list/pet-list.component';
import { PetItemComponent } from './pet-list/pet-item/pet-item.component';
import { PetsRoutingModule } from './pets-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PetDetailsComponent } from './pet-details/pet-details.component';

@NgModule({
  declarations: [
    PetsComponent,
    PetListComponent,
    PetItemComponent,
    PetEditComponent,
    PetDetailsComponent,
  ],
  imports: [
    CommonModule,
    ClarityModule,
    FormsModule,
    ReactiveFormsModule,
    PetsRoutingModule,
  ],
})
export class PetsModule { }
