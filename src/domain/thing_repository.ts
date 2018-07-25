import { ThingId } from './thing_id';
import { Thing } from './thing';

export interface ThingRepository {
  nextIdentifier(): ThingId;
  save(thing: Thing): void;
  remove(thing: Thing): void;
  findByThingId(id: ThingId): Thing | null;
}
