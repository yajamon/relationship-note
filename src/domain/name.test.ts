import { Name } from './name';

describe('Name', () => {
  it('文字列を引数に生成できる', () => {
    const name = Name.create('Taro');
    expect(name.isError).toEqual(false);
  });
  it('空文字では生成できない', () => {
    const name = Name.create('');
    expect(name.isError).toEqual(true);
  });
  describe('value', () => {
    it('コンストラクタに与えた値と同じ値である', () => {
      const name1 = 'Taro';
      const obj1 = Name.create(name1);
      const name2 = 'Marie';
      const obj2 = Name.create(name2);
      if (obj1.isError || obj2.isError) {
        throw Error();
      }
      expect(obj1.ok.value).toEqual(name1);
      expect(obj2.ok.value).toEqual(name2);
    });
  });
});
