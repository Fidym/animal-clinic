import { Component, OnInit, Input } from '@angular/core';
import { Pet } from '../../pet.model';

@Component({
  selector: 'app-pet-item',
  templateUrl: './pet-item.component.html',
  styleUrls: ['./pet-item.component.css']
})
export class PetItemComponent implements OnInit {

  @Input() pet: Pet;
  @Input() index: number;


  constructor() {
   }

  ngOnInit() {
  }

}
