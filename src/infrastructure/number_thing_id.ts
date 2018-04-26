import { ThingId } from '../domain/thing_id';

export class NumberThingId implements ThingId {
    readonly value: number;
    constructor(value: number) {
        if (value <= 0) { throw Error('生成できません'); }
        this.value = value;
    }

    equals(id: ThingId): boolean {
        return true;
    }
}
