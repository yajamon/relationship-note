import { incrementalGenerator } from "./incremental_generator";

describe("IncrementalGenerator", () => {
  it("最初は、与えた初期値が得られる", () => {
    const first = 5;
    const gen = incrementalGenerator(first);
    expect(gen.next().value).toBe(first);
    const second = 3;
    const gen2 = incrementalGenerator(second);
    expect(gen2.next().value).toBe(second);
  });
  it("next()を呼ぶ度、前回の値+1 の値を返す", () => {
    const first = 5;
    const gen = incrementalGenerator(first);
    expect(gen.next().value).toBe(first);
    expect(gen.next().value).toBe(first + 1);
    expect(gen.next().value).toBe(first + 2);
  });
});
