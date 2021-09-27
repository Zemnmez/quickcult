import * as iter from '.';

describe('reduce', () => {
	test('sum', () => {
		expect(iter.reduce([1, 2, 3], (p, c) => p + c, 0)).toEqual(6);
	});
});
