import { ThingRepository } from '../domain/thing_repository';
import { NumberThingId } from './number_thing_id';
import { Thing } from '../domain/thing';
import { incrementalGenerator } from './incremental_generator';

export class MapThingRepository implements ThingRepository {
  private idGenerator = incrementalGenerator(1);

  nextIdentifier(): NumberThingId {
    return new NumberThingId(this.idGenerator.next().value);
  }

  save(thing: Thing) {
    // TODO
  }
  remove(thing: Thing) {
    // TODO
  }
}
