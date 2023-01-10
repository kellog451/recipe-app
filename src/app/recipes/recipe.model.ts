export class Recipe {
  public id: number;
  public name: string;
  public description: string;
  public imageUrl: string;

  constructor(id: number, name: string, description: string, imageUrl: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.imageUrl = imageUrl;
  }
}
