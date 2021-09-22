import * as cultist from 'cultist';
import immutable from 'immutable';
import * as element from 'cultist/element';

describe('decreaseQuantity', () => {
	test('stacked', () => {
		const elements = Object.entries({
			someident123: cultist.state.createElement('money', {
				quantity: 10,
			}),
		});

		const [[, el]] = cultist.action.decreaseQuantityBy(
			'money',
			elements,
			5
		);

		expect(el.quantity).toEqual(5);
		expect(el.elementId).toEqual('money');
	});

	test('unstacked', () => {
		const elements = Object.entries({
			abc: cultist.state.createElement('money'),
			def: cultist.state.createElement('money'),
			hij: cultist.state.createElement('money'),
		});

		const [...els] = cultist.action.decreaseQuantityBy(
			'money',
			elements,
			2
		);

		expect(els.length).toEqual(1);
	});
});

describe('applyEffect', () => {
	test('add', () => {
		let state = cultist.state.NewState();

		state = cultist.action.effect(state, {
			money: 10,
		});

		expect(element.count('money', state.elementStacks)).toEqual(10);
	});

	test('remove', () => {
		let state = cultist.state.NewState({
			elementStacks: immutable.Map(
				Object.entries({
					abc: cultist.state.createElement('money'),
					def: cultist.state.createElement('money'),
					hij: cultist.state.createElement('money'),
				})
			),
		});

		state = cultist.action.effect(state, {
			money: -3,
		});

		expect(state.elementStacks?.size).toEqual(0);
	});
});
