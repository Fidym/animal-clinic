export class Appointment {
  public name: string;
  public date: Date;
  public petName: string;
  public userId: string;
  public doctorName: string;
  public note: string;

  constructor(name: string, date: Date, petName: string, userId: string, doctorName: string, note: string) {
    this.name = name;
    this.date = date;
    this.petName = petName;
    this.userId = userId;
    this.doctorName = doctorName;
    this.note = note;
  }
}
