import { MapThingRepository } from './map_thing_repository';
import { Thing } from '../domain/thing';
import { Name } from '../domain/name';

describe('MapThingRepository', () => {
  describe('nextIdentifier()', () => {
    it('実行するたびに違うidを返す', () => {
      let repo = new MapThingRepository();
      let id1 = repo.nextIdentifier();
      let id2 = repo.nextIdentifier();
      expect(id1.equals(id2)).toBe(false);
    });
  });

  describe('findByThingId()', () => {
    it('保存したThingをThingIdで取り出すことができる', () => {
      let repo = new MapThingRepository();
      let id = repo.nextIdentifier();
      let name = new Name('Taro');
      let thing = new Thing(id, name);
      repo.save(thing);
      let result = repo.findByThingId(id);
      expect(result).toBe(thing);

      // 別のデータが追加されても適切にThingが取得できる
      repo.save(new Thing(repo.nextIdentifier(), new Name('dust')));
      let result2 = repo.findByThingId(id);
      expect(result2).toBe(thing);
    });
  });
});
