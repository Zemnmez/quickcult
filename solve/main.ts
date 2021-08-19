import core from 'gen/core_en_ts';
import * as Core from 'gen/core_en_ts';

type ElementIdCache = Map<string, Core.Element>

export function elementById(id: string, core: Core.Core, cache?: ElementIdCache): [Core.Element | undefined, ElementIdCache] {
    if (cache === undefined) {
        cache = new Map();
        for (const element of core.elements) {
            cache.set(id, element);
        }
    }

    return [cache.get(id), cache ]
}

export function legacyInfo(l: Core.Legacy): string {
    return JSON.stringify(l)
}

export const Main = async () => {
    for (const legacy of core.legacies) {
        console.log(legacyInfo(legacy as any))
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