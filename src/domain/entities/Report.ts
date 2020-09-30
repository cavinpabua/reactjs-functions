export class Report {

  male: string;
  female: string
  other: string;
  unknown: string;
  constructor(male: string, female: string, other: string, unknown:string) {
    this.male = male;
    this.female = female;
    this.other = other;
    this.unknown = unknown;
  }
}
