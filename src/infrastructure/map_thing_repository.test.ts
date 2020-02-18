import { unwrap } from "@yajamon/result.ts";
import { Name } from "../domain/name";
import { Thing } from "../domain/thing";
import { MapThingRepository } from "./map_thing_repository";

describe("MapThingRepository", () => {
  describe("nextIdentifier()", () => {
    it("実行するたびに違うidを返す", () => {
      const repo = new MapThingRepository();
      const id1 = repo.nextIdentifier();
      const id2 = repo.nextIdentifier();
      expect(id1.equals(id2)).toBe(false);
    });
  });

  describe("findByThingId()", () => {
    it("保存したThingをThingIdで取り出すことができる", () => {
      const repo = new MapThingRepository();
      const id = repo.nextIdentifier();
      const name = unwrap(Name.create("Taro"));
      const thing = new Thing(id, name);
      repo.save(thing);
      const result = repo.findByThingId(id);
      expect(result).toBe(thing);

      // 別のデータが追加されても適切にThingが取得できる
      repo.save(new Thing(repo.nextIdentifier(), unwrap(Name.create("dust"))));
      const result2 = repo.findByThingId(id);
      expect(result2).toBe(thing);
    });
  });
});

describe("Observable", () => {
  describe("subscribe()", () => {
    it("通知を受ける", done => {
      const repo = new MapThingRepository();
      repo.subscribe(() => {
        done();
      });
      repo.notifySubscribers();
    });
  });
});
