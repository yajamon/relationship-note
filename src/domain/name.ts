export class Name {
  readonly value: string;
  constructor(value: string) {
    if (value === '') { throw Error(); }
    this.value = value;
  }
}
