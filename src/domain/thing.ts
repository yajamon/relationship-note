import { Association } from "./association";
import { Name } from "./name";
import { ThingId } from "./thing_id";

export class Thing {
  readonly associations: Association[] = [];

  constructor(readonly id: ThingId, public name: Name) {}

<<<<<<< HEAD
  associate(thing: Thing, label: string, description: string): void {
=======
  public associate(thing: Thing, label: string, description: string): void {
>>>>>>> 0ff208fa95f8afc29feedbb2ebba5e95eae3a86b
    this.associations.push({
      thing: thing,
      label: label,
      description: description
    });
  }
}
