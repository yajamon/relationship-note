import { Err, Ok, Result } from "@yajamon/result.ts";
export class Name {
  readonly value: string;
  private constructor(value: string) {
    this.value = value;
  }
  static create(value: string): Result<Name, Error> {
    if (value === '') { return Err(new Error("空の文字列はだめです")); }
    return Ok(new Name(value));
  }
}
