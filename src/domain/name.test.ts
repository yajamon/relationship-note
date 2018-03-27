import { Name } from './name';

describe('Name', () => {
    it('文字列を引数に生成できる', () => {
        let _ = new Name('Taro');
    });
    it('空文字では生成できない', () => {
        expect(() => {
            let _ = new Name('');
        }).toThrow();
    });
});
