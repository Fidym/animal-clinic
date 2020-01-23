import { AuthGuard } from './../auth/auth.guard';
import { PetEditComponent } from './pet-edit/pet-edit.component';
import { NgModule } from '@angular/core';
import { PetsComponent } from './pets.component';
import { Routes, RouterModule } from '@angular/router';
import { PetListComponent } from './pet-list/pet-list.component';
import { PetDetailsComponent } from './pet-details/pet-details.component';

const routesPets: Routes = [
  {
  path: 'my-pets',
  component: PetsComponent,
  canActivate: [AuthGuard],
  children : [
    { path: 'view', component: PetListComponent },
    { path: 'add-pet', component: PetEditComponent },
    { path: ':id', component: PetDetailsComponent },
    { path: ':id/edit', component: PetEditComponent},
  ]
 }
];

@NgModule({
  imports: [RouterModule.forChild(routesPets)],
  exports: [RouterModule]
})
export class PetsRoutingModule { }
