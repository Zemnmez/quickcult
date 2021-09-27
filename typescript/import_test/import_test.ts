import * as a from './a';

test('import', () => {
	expect(a.MyString).toEqual('Hello world!');
});
