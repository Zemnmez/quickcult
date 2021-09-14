/**
 * @fileoverview like save state, but more sane.
 */

import * as save from '//cultist/save';
import * as iter from '//typescript/iter';
import { optionalChain } from '//typescript/util';
import Immutable from 'immutable';
import { v4 as v4uuid } from 'uuid';

const uuid = { v4: v4uuid };

type ImmutableRecord<V> = Immutable.RecordOf<{
	[k: string]: V;
}>;

interface MutableState {
	elementStacks?: Immutable.Map<string, ElementInstance>;

	decks?: Immutable.Map<string, Deck | undefined>;

	metainfo?: Immutable.RecordOf<{
		VERSIONNUMBER?: string;
	}>;

	characterDetails?: CharacterDetails;

	situations?: Immutable.Map<string, Situation | undefined>;
}

export function createElement(
	id: string,
	tmpl: Partial<Omit<MutableElementInstance, 'id'>> = {}
): ElementInstance {
	return NewElementInstance({
		elementId: id,
		quantity: 1,
		...tmpl,
	});
}

export function addElements(
	el: Iterable<ElementInstance>,
	stacks?: Immutable.Map<string, ElementInstance>
): Immutable.Map<string, ElementInstance> {
	if (stacks === undefined) stacks = Immutable.Map<string, ElementInstance>();

	return stacks.withMutations(stacks => {
		for (const element of el) {
			stacks.set(uuid.v4(), element);
		}

		return stacks;
	});
}

export type State = Immutable.RecordOf<MutableState>;

export const NewState = Immutable.Record<MutableState>({
	elementStacks: undefined,
	decks: undefined,
	metainfo: undefined,
	characterDetails: undefined,
	situations: undefined,
});

export function serializeState(s: State): save.State {
	return {
		...s,
		elementStacks: optionalChain(iter.dict.map)(
			optionalChain(iter.dict.fromEntries)(s.elementStacks?.entries()),
			serializeElementInstance
		),
		decks: iter.dict.fromEntries([...s?.decks?.entries() ?? []].map(([k, v]) => [k, serializeDeck(v)])),
		situations: iter.dict.fromEntries([...s?.situations?.entries() ?? []].filter(
			<T1, T2 extends any>(v: [T1, T2| undefined]): v is [T1, T2] => v[1] !== undefined
		).map(([k, v]) => [k, serializeSituation(v)]))
	};
}

export function deserializeState(s: save.State): State {
	return NewState({
		...s,
		decks: Immutable.Map(optionalChain(iter.dict.map)(s.decks, optionalChain(deserializeDeck)) ?? {}),
		elementStacks: Immutable.Map(
			Object.entries(s.elementStacks??{}).map(([k, v]) => [k, deserializeElementInstance(v)])
		),
		metainfo: deserializeMetaInfo(s.metainfo),
		characterDetails: deserializeCharacterDetails(s.characterDetails),
		situations: Immutable.Map(optionalChain(iter.dict.map)(s.situations, deserializeSituation) ?? {})
	});
}

export interface MutableElementInstance {
	/** Time in seconds */
	lifetimeRemaining?: number;
	lastTablePosX?: number;
	lastTablePosY?: number;
	/** Will be destroyed when recipe completes */
	markedForConsumption?: boolean;
	elementId?: string;
	quantity?: number;
}

export type ElementInstance = Immutable.RecordOf<MutableElementInstance>;

export const NewElementInstance = Immutable.Record<MutableElementInstance>({
	lifetimeRemaining: undefined,
	lastTablePosX: undefined,
	markedForConsumption: undefined,
	elementId: undefined,
	quantity: undefined,
});

export function serializeBoolean(b: boolean): string {
	return b ? 'True' : 'False';
}

export function serializeElementInstance(
	e: ElementInstance
): save.ElementInstance {
	return {
		...e,
		lifetimeRemaining: e.lifetimeRemaining?.toString(),
		lastTablePosX: e.lastTablePosX?.toString(),
		lastTablePosY: e.lastTablePosY?.toString(),
		markedForConsumption: optionalChain(serializeBoolean)(
			e.markedForConsumption
		),
		quantity: e.quantity?.toString(),
	};
}

export const deserializeNumber = optionalChain(
	(e: string) => +e
);

export const deserializeBoolean = optionalChain(
	(e: string) => {
		switch(e.toLowerCase()){
		case "true": return true;
		case "false": return false;
		}

		throw new Error(`Cannot parse as boolean: ${e}`);
	}
);


export function deserializeElementInstance(e: save.ElementInstance): ElementInstance {
	return NewElementInstance({
		...e,
		lifetimeRemaining: deserializeNumber(e.lifetimeRemaining),
		lastTablePosX: deserializeNumber(e.lastTablePosX),
		lastTablePosY: deserializeNumber(e.lastTablePosY),
		markedForConsumption: deserializeBoolean(e.markedForConsumption),
		quantity: deserializeNumber(e.quantity),
	})
}

interface MutableDeck {
	eliminatedCards?: Immutable.List<string>;
	cards?: Immutable.List<string>;
}

export type Deck = Immutable.RecordOf<MutableDeck>;

export const NewDeck = Immutable.Record<MutableDeck>({});

export function serializeDeck({ eliminatedCards, cards }: Deck): save.Deck {
	return {
		eliminatedCards,
		...Object.assign(
			{},
			...cards?.map(([card, index]) => ({ [index]: card })) ?? []
		),
	};
}

export function deserializeDeck(s: save.Deck): Deck {
	const { eliminatedCards, ...otherCards } = s;
	let cardList = [];

	for (const [cardInd, card] of Object.entries(otherCards?? {})) {
		if (card instanceof Array) throw new Error("Should be single card, not multiple");
		cardList[+cardInd] = card;
	}

	return NewDeck({
		...s,
		eliminatedCards: Immutable.List(eliminatedCards),
		cards: Immutable.List(cardList)
	});
}

export interface MutableLevers {
	lastheadquarters?: string;
	lastfollower?: string;
	lastsignificantpainting?: string;
	lastpersonkilled?: string;
	lastcharactername?: string;
	lastcult?: string;
	lasttool?: string;
	lastbook?: string;
	lastdesire?: string;
};

export type Levers = Immutable.RecordOf<MutableLevers>;

export const NewLevers = Immutable.Record<MutableLevers>({});

export function serializeLevers(l: Levers): save.Levers {
	return {...l}
}

export function deserializeLevers(l: save.Levers): Levers {
	return NewLevers({...l});
}

export interface MutableCharacterDetails {
	name?: string;
	/**
	 * Just a label, not an ID.
	 */
	profession?: string;

	pastLevers?: Levers;

	executions?: {
		/**
		 * Not sure what this means yet,
		 * but it might be running recipes.
		 */
		[key: string]: string;
	};

	futureLevers?: Levers;

	activeLegacy?: string;
};

export type CharacterDetails = Immutable.RecordOf<MutableCharacterDetails>;

export const NewCharacterDetails = Immutable.Record<MutableCharacterDetails>({});

export function serializeNewCharacterDetails(d: CharacterDetails): save.State["characterDetails"] {
	return {...d}
}

export function deserializeCharacterDetails(d: save.State["characterDetails"]): CharacterDetails {
	return NewCharacterDetails({
		...d,
		pastLevers: optionalChain(deserializeLevers)(d?.pastLevers),
		futureLevers: optionalChain(deserializeLevers)(d?.futureLevers)
	})
}

export interface MutableSituation {
	situationStoredElements?: Map<string, ElementInstance>;
	verbId?: string;
	ongoingSlotElements?: Map<string, ElementInstance>;
	situationWindowY?: string;
	title?: string;
	timeRemaining?: string;
	recipeId?: string | null;
	situationWindowX?: string;
	state?: string;
	situationOutputNotes?: Map<string, {title?:string}>;
	situationWindowOpen?: string;
	completioncount?: string;
}

export type Situation = Immutable.RecordOf<MutableSituation>;

export const NewSituation = Immutable.Record<MutableSituation>({});

export function serializeSituation(s: Situation): save.Situation {
	return {
		...s,
		situationStoredElements: optionalChain(iter.dict.map)(
			s.situationStoredElements?.toJS() as any,
			serializeElementInstance
		),

		ongoingSlotElements: optionalChain(iter.dict.map)(
			s.ongoingSlotElements?.toJS() as any,
			serializeElementInstance
		),
		situationOutputNotes: s.situationOutputNotes?.toJS() as any,
	};
}

export function deserializeSituation(s: save.Situation): Situation {
	return NewSituation({
		...s
	});
}


export interface MutableMetainfo {
	VERSIONNUMBER?: string
}

export type MetaInfo = Immutable.RecordOf<MutableMetainfo>;

export const NewMetaInfo = Immutable.Record<MutableMetainfo>({});

export function deserializeMetaInfo(m: save.State["metainfo"]): MetaInfo {
	return NewMetaInfo({
		...m
	});
}

export function serializemetaInfo(m: MetaInfo): save.State["metainfo"] {
	return {
		...m
	}
}


