import { incrementalGenerator } from './incremental_generator';

describe('IncrementalGenerator', () => {
    it('最初は、与えた初期値が得られる', () => {
        let first = 5;
        let gen = incrementalGenerator(first);
        expect(gen.next().value).toBe(first);
        let second = 3;
        let gen2 = incrementalGenerator(second);
        expect(gen2.next().value).toBe(second);
    });
});
