export interface ThingId {
  equals(id: ThingId): boolean;
  readonly stringify: string;
}
