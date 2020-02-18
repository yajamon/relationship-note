import { ThingId } from "../domain/thing_id";

export class NumberThingId implements ThingId {
  readonly value: number;
  constructor(value: number) {
    if (value <= 0) {
      throw Error("生成できません");
    }
    this.value = value;
  }

  equals(id: ThingId): boolean {
    if (!(id instanceof NumberThingId)) {
      return false;
    }
    return this.value === id.value;
  }

  get stringify(): string {
    return this.value.toString();
  }
}
