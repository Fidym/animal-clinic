export class Doctor {
  public name: string;
  public imagePath: string;
  public category: [string];
  public title: string;
  public descriptionArray: [string];
  public userId: string;

  constructor(name: string,  title: string, imagePath: string, category: [string], desc: [string], userId: string) {
    this.name = name;
    this.imagePath = imagePath;
    this.category = category;
    this.title = title;
    this.descriptionArray = desc;
    this.userId = userId;
  }
}

