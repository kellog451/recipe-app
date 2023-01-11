export class Recipe {
  public id: number;
  public name: string;
  public description: string;
  public imageUrl: string;
  public steps: string[];

  constructor(
    id: number,
    name: string,
    description: string,
    imageUrl: string,
    steps: string[]
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.imageUrl = imageUrl;
    this.steps = steps;
  }
}
