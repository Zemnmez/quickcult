/**
 * @fileoverview like save state, but more sane.
 */

import * as Save from '../save';
import * as State from '../state';
import * as Iter from '../../typescript/iter';
import { maybe } from '../../typescript/util';

export function elements(
	s: State.State['elementStacks'] | State.Situation['situationStoredElements']
): Record<string, Save.ElementInstance> | undefined {
	return maybe(Iter.dict.map)(
		maybe(Iter.dict.fromEntries)(s),
		elementInstance
	);
}

export function state(s: State.State): Save.State {
	return {
		...s.toJSON(),
		elementStacks: elements(s.elementStacks),
		decks: maybe(Iter.dict.map)(
			maybe(Iter.dict.fromEntries)(s.decks),
			deck
		),
		situations: maybe(Iter.dict.map)(
			maybe(Iter.dict.fromEntries)(s.situations),
			situation
		),
	};
}

export function boolean(b: State.Boolean): Save.Boolean_ {
	return b ? 'True' : 'False';
}

export function number(b: State.Number): Save.Number_ {
	return b.toString();
}

export function elementInstance(
	e: State.ElementInstance
): Save.ElementInstance {
	return {
		...e.toJSON(),
		lifetimeRemaining: maybe(number)(e.lifetimeRemaining),
		lastTablePosX: maybe(number)(e.lastTablePosX),
		lastTablePosY: maybe(number)(e.lastTablePosY),
		markedForConsumption: maybe(boolean)(e.markedForConsumption),
		quantity: maybe(number)(e.quantity),
	};
}

export function levers(l: State.Levers): Save.Levers {
	return { ...l.toJSON() };
}

export function characterDetails(
	d: State.CharacterDetails
): Save.State['characterDetails'] {
	return { ...d.toJSON() };
}

export function deck(d: State.Deck): Save.Deck {
	const cards = Iter.dict.fromEntries(
		d.cards?.map((card, index) => [card, number(index)]) ?? []
	);
	return {
		eliminatedCards: [...(d.eliminatedCards ?? [])],
		...cards,
	};
}

export function situation(s: State.Situation): Save.Situation {
	return {
		...s.toJSON(),
		situationStoredElements: elements(s.situationStoredElements),

		ongoingSlotElements: elements(s.ongoingSlotElements),
		situationOutputNotes: maybe(Iter.dict.map)(
			maybe(Iter.dict.fromEntries)(s.situationOutputNotes),
			v => v
		),
	};
}

export function metaInfo(m: State.MetaInfo): Save.State['metainfo'] {
	return {
		...m.toJSON(),
	};
}
