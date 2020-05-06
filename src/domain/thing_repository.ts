import { ThingId } from "../thing_id";
import { Observable } from "./observer";
import { Thing } from "./thing";

export interface ThingRepository extends Observable {
  nextIdentifier(): ThingId;
  save(thing: Thing): void;
  remove(thing: Thing): void;
  findByThingId(id: ThingId): Thing | null | undefined;
  query(logic: (thing: Thing) => boolean): Thing[];
}
