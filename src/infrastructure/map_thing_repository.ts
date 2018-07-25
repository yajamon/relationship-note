import { ThingRepository } from '../domain/thing_repository';
import { ThingId } from '../domain/thing_id';
import { NumberThingId } from './number_thing_id';
import { Thing } from '../domain/thing';
import { incrementalGenerator } from './incremental_generator';

export class MapThingRepository implements ThingRepository {
  private idGenerator = incrementalGenerator(1);
  private thing: Thing;

  nextIdentifier(): NumberThingId {
    return new NumberThingId(this.idGenerator.next().value);
  }

  save(thing: Thing) {
    // TODO
    this.thing = thing;
  }
  remove(thing: Thing) {
    // TODO
  }
  findByThingId(id: ThingId): Thing | null {
    // TODO
    return this.thing;
  }

}
