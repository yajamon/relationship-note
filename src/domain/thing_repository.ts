import { Observable } from "../observer";
import { Thing } from "../thing";
import { ThingId } from "../thing_id";

export interface ThingRepository extends Observable {
  nextIdentifier(): ThingId;
  save(thing: Thing): void;
  remove(thing: Thing): void;
  findByThingId(id: ThingId): Thing | null | undefined;
  query(logic: (thing: Thing) => boolean): Thing[];
}
