import SaveStateExample from 'cultist/example/savestate';
import * as save from 'cultist/save';

test('savestate', () => {
	const test: save.State = SaveStateExample;
	expect(test).not.toBeUndefined();
});
