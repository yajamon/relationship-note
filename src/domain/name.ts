import { Result, err, ok } from "./result";
export class Name {
  readonly value: string;
  private constructor(value: string) {
    this.value = value;
  }
  static create(value: string): Result<Name, Error> {
    if (value === '') { return err(new Error("空の文字列はだめです")); }
    return ok(new Name(value));
  }
}
