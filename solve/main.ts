import * as cultist from './types';
import fs from 'fs';


type ElementIdCache = Map<string, cultist.Element>

export function elementById(id: string, core: cultist.Core, cache?: ElementIdCache): [cultist.Element | undefined, ElementIdCache] {
    if (cache === undefined) {
        cache = new Map();
        for (const element of core.elements) {
            cache.set(id, element);
        }
    }

    return [cache.get(id), cache ]
}

export function mustElementById(id: string, core: cultist.Core, cache?: ElementIdCache): [cultist.Element, ElementIdCache] {
    const [el, c ] = elementById(id, core, cache);
    if (el === undefined) throw new Error(`Cannot find element ${id}`);
    return [ el, c ];

}

function* duplicate<T>(i: Iterable<[T, number]>) {
    for (const [v, n] of i) {
        for (let i = 0; i < n; i++) {
            yield v;
        }
    }
}

export function elementsByEffects(effects: Record<string, number>, core: cultist.Core, cache?: ElementIdCache): cultist.Element[] {
    const elementsAndCounts = Object.entries(effects).map(([id, count]): [ cultist.Element, number ] => {
        let el: cultist.Element;
        ([el, cache] = mustElementById(id, core, cache))
        return [el, count];
    });

    const rets =  [...duplicate(elementsAndCounts)];
    return rets;
}

interface BoardState {
    elements?: cultist.Element[]
    verbs?: cultist.Verb[]
}

export function initialBoardStateFromLegacy(l: cultist.Legacy, core: cultist.Core, cache?: ElementIdCache): BoardState {
    return {
        elements: l.effects !== undefined? elementsByEffects(l.effects, core, cache): undefined
    }
}


export const Main = async () => {
    const core: cultist.Core = JSON.parse((await fs.promises.readFile('gen/core_en.json')).toString('utf-8'));
    let elementIdCache;
    for (const legacy of core.legacies) {
        console.log(initialBoardStateFromLegacy(legacy, core));
    }
}

export default Main;


if (require.main == module) {
    Main().catch(e => {
        console.error(e);

        // nb: not the same as nullish because we want null OR zero.
        process.exitCode = process.exitCode || 1;
    });
}