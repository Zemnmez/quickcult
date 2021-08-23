import * as pattern from '//typescript/match';

function displayList<Item>(v: Item[], display: (i: Item) => string): string {
	return `[${v.map(i => display(i))}]`;
}
