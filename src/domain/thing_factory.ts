import { Name } from "../name";
import { Thing } from "./thing";
import { ThingRepository } from "./thing_repository";

export class ThingFactory {
  constructor(private readonly repository: ThingRepository) {}
  public create(thingName: Name): Thing {
    const id = this.repository.nextIdentifier();
    const thing = new Thing(id, thingName);
    return thing;
  }
}
