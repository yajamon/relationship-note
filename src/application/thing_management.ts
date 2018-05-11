import { Thing } from '../domain/thing';
import { ThingRepository } from '../domain/thing_repository';

export class ThingManagement {
    constructor(private repository: ThingRepository) {
    }

    createThing() {
        let thing = new Thing(this.repository.nextIdentifier());
        this.repository.save(thing);
    }

    updateThing(thing: Thing) {
        this.repository.save(thing);
    }

    deleteThing(thing: Thing) {
        this.repository.remove(thing);
    }
}
