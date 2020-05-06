import { ThingRepository } from "../domain/thing_repository";
import { Thing } from "../thing";
import { ThingId } from "../thing_id";
import { NumberThingId } from "../thing_id/number_thing_id";
import { incrementalGenerator } from "./incremental_generator";

export class MapThingRepository implements ThingRepository {
  private idGenerator = incrementalGenerator(1);
  private things: Map<number, Thing> = new Map();
  private subscribers = new Set<() => void>();

  nextIdentifier(): NumberThingId {
    return new NumberThingId(this.idGenerator.next().value);
  }

  save(thing: Thing) {
    if (!(thing.id instanceof NumberThingId)) {
      return;
    }
    this.things.set(thing.id.value, thing);
    this.notifySubscribers();
  }
  remove(thing: Thing) {
    // TODO
  }
  findByThingId(id: ThingId): Thing | null | undefined {
    if (!(id instanceof NumberThingId)) {
      return null;
    }
    return this.things.get(id.value);
  }
  query(logic: (thing: Thing) => boolean): Thing[] {
    //console.log("query", this.things);

    return Array.from(this.things.values()).filter(logic);
  }

  subscribe(callback: () => void): void {
    this.subscribers.add(callback);
  }
  unsubscribe(callback: () => void): void {
    this.subscribers.delete(callback);
  }
  notifySubscribers(): void {
    this.subscribers.forEach(callback => {
      callback();
    });
  }
}
