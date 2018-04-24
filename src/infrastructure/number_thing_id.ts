import { ThingId } from '../domain/thing_id';

export class NumberThingId {
    constructor(readonly value: number) {
         throw Error('生成できません');
    }
}
