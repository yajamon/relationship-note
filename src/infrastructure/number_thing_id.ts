import { ThingId } from '../domain/thing_id';

export class NumberThingId {
    readonly value: number;
    constructor(value: number) {
        if (value <= 0) { throw Error('生成できません'); }
        this.value = value;
    }
}
