import { Name } from './name';

describe('Name', () => {
    it('文字列を引数に生成できる', () => {
        expect(new Name('Taro')).not.toBeNull();
    });
    it('空文字では生成できない', () => {
        expect(() => {
            return new Name('');
        }).toThrow();
    });
    describe('value', () => {
        it('コンストラクタに与えた値と同じ値である', () => {
            let param = 'Taro';
            let name = new Name(param);
            expect(name.value).toEqual(param);
        });
    });
});
