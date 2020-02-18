export interface ThingId {
  equals(id: ThingId): boolean;
  stringify(): string;
}
