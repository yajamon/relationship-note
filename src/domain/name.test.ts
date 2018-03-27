import { Name } from './name';

describe('Name', () => {
    it('空文字では生成できない', () => {
        expect(() => {
            let _ = new Name('');
        }).toThrow();
    });
});
