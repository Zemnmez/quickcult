import * as State from '//cultist/state';
import * as Save from '//cultist/save';

function roundTrip<I, O>(a: (v: I) => O, b: (v: O) => I): (v: I) => I {
	return (v: I) => b(a(v));
}

test('round trip serialization', () => {
	const ElementInstanceExample: Save.ElementInstance = {
		lifetimeRemaining: '10',
		lastTablePosX: '10',
		lastTablePosY: '20',
		elementId: 'egg',
		quantity: '10',
	};

	{
		const st = State.deserialize.elementInstance(ElementInstanceExample);
		expect(st).toEqual(
			roundTrip(
				State.serialize.elementInstance,
				State.deserialize.elementInstance
			)(st)
		);
	}

	const DeckExample: Save.Deck = {
		eliminatedCards: ['card1', 'card2', 'card3'],
		cards: ['card4', 'card5'],
	};

	{
		const st = State.deserialize.deck(DeckExample);
		expect(st).toEqual(
			roundTrip(State.serialize.deck, State.deserialize.deck)(st)
		);
	}
});
