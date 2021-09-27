import * as cultist from '.';
import immutable from 'immutable';

describe('count', () => {
	test('stacks', () => {
		let stacks: cultist.state.State['elementStacks'] = immutable.Map<
			string,
			cultist.state.ElementInstance
		>();

		stacks = stacks.set('element123', cultist.state.createElement('money'));
		stacks = stacks.set(
			'element1235',
			cultist.state.createElement('money')
		);

		expect(cultist.element.count('money', stacks)).toEqual(2);
	});
});
