import SaveStateExample from './example/savestate';
import * as save from './save';

test('savestate', () => {
	const test: save.State = SaveStateExample;
	expect(test).not.toBeUndefined();
});
