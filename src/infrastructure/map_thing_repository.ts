import { ThingRepository } from '../domain/thing_repository';
import { NumberThingId } from './number_thing_id';
import { Thing } from '../domain/thing';

export class MapThingRepository implements ThingRepository {
    private nextId = 1;

    nextIdentifier(): NumberThingId {
        let id = new NumberThingId(this.nextId);
        this.nextId += 1;
        return id;
    }

    save(thing: Thing) {
        // TODO
    }
    remove(thing: Thing) {
        // TODO
    }
}
