import { Treatment } from './../shared/treatment.model';

export class Pet {
  public name: string;
  public imagePath: string;
  public category: string;
  public age: number;
  public description: string;
  public treatments: Treatment[];
  public userId: string;

  constructor(name: string,  imagePath: string, category: string, age: number, desc: string, treat: Treatment[], userId: string) {
    this.name = name;
    this.imagePath = imagePath;
    this.category = category;
    this.age = age;
    this.description = desc;
    this.treatments = treat;
    this.userId = userId;
  }
}
