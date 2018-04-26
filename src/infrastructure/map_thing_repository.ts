import { ThingRepository } from '../domain/thing_repository';
import { NumberThingId } from './number_thing_id';
import { Thing } from '../domain/thing';

export class MapThingRepository implements ThingRepository {

    nextIdentifier(): NumberThingId {
        return new NumberThingId(1);
    }

    save(thing: Thing) {
        // TODO
    }
    remove(thing: Thing) {
        // TODO
    }
}
