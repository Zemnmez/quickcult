import SaveStateExample from '//cultist/example/savestate';
import textSaveStateExample from '//cultist/example/savestate.txt';
import * as save from '//cultist/save';

test('savestate', () => {
	const test: save.State = SaveStateExample;
	console.log(test);
});

it('should load a save without error', () => {
	save.load(textSaveStateExample);
});
