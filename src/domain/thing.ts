import { ThingId } from './thing_id';
import { Name } from './name';

export class Thing {
  constructor(readonly id: ThingId, public name: Name) {
  }
}
