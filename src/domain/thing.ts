import { Association } from "./association";
import { Name } from "./name";
import { ThingId } from "./thing_id";

export class Thing {
  readonly associations: Association[] = [];

  constructor(readonly id: ThingId, public name: Name) {}

  associate(thing: Thing, label: string, description: string): void {
    this.associations.push({
      thing: thing,
      label: label,
      description: description
    });
  }
}
