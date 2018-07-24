import { MapThingRepository } from './map_thing_repository';

describe('MapThingRepository', () => {
  describe('nextIdentifier()', () => {
    it('実行するたびに違うidを返す', () => {
      let repo = new MapThingRepository();
      let id1 = repo.nextIdentifier();
      let id2 = repo.nextIdentifier();
      expect(id1.equals(id2)).toBe(false);
    });
  });
});
