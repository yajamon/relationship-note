import { NumberThingId } from './number_thing_id';

describe('NumberThingId', () => {
    it('0以下の数字では生成できない', () => {
        expect(() => {
            return new NumberThingId(0);
        }).toThrow();
    });
});
