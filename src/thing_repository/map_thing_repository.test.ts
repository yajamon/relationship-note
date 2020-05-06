import { unwrap } from "@yajamon/result.ts";
import { Name } from "../name";
import { Thing } from "../thing";
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

  describe("query()", () => {
    it("Thingの要素を抽出できる", () => {
      const repo = new MapThingRepository();
      repo.save(new Thing(repo.nextIdentifier(), unwrap(Name.create("Taro"))));
      repo.save(new Thing(repo.nextIdentifier(), unwrap(Name.create("Jiro"))));
      repo.save(new Thing(repo.nextIdentifier(), unwrap(Name.create("Hana"))));

      const result = repo.query(thing => thing.name.value === "Jiro");
      expect(result.length).toBe(1);
      expect(result[0].name.value).toBe("Jiro");
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

    it("Thingを追加したら通知を受けたい", done => {
      const repo = new MapThingRepository();
      repo.subscribe(() => {
        done();
      });
      repo.save(new Thing(repo.nextIdentifier(), unwrap(Name.create("Foo"))));
    });
  });
});
