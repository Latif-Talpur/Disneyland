export class Character {
  id: number;
  name: string;
  pictureUrl: string; // New property for storing the picture URL

  constructor(id: number, name: string, pictureUrl: string) {
    this.id = id;
    this.name = name;
    this.pictureUrl = pictureUrl;
  }
}
