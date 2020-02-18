import { NumberThingId } from "./number_thing_id";

describe("NumberThingId", () => {
  it("1以上の数で生成できる", () => {
    expect(new NumberThingId(1)).not.toBeNull();
  });
  it("0以下の数字では生成できない", () => {
    expect(() => {
      return new NumberThingId(0);
    }).toThrow();
  });

  describe("equals()", () => {
    it("同じ数字で初期化されたものならtrue", () => {
      const left = new NumberThingId(1);
      const right = new NumberThingId(1);
      expect(left.equals(right)).toBe(true);
    });
    it("違う数字で初期化したものならばfalse", () => {
      const one = new NumberThingId(1);
      const two = new NumberThingId(2);
      expect(one.equals(two)).toBe(false);
    });
  });

  describe("stringify()", () => {
    it("文字列化", () => {
      const one = new NumberThingId(1);
      expect(one.stringify()).toBe("1");
    });
  });
});
