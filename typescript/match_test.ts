import pattern from '//typescript/match';

test('match', () => {
	const match = pattern(() => undefined)(
		(v: { name: string }): v is { name: 'john' } => v.name == 'john',
		() => 'hi john!' as const
	)(
		(v: { age: number }): v is { age: 20 } => v.age == 20,
		() => 'you are 20 years old' as const
	);

	expect(
		match.match({ name: 'whatever' as const, age: 10 as const })
	).toEqual(undefined);
	expect(match.match({ name: 'john', age: 10 })).toEqual('hi john!');
	expect(match.match({ name: 'somethign', age: 20 })).toEqual(
		'you are 20 years old'
	);

	// @ts-expect-error
	expect(match.match(2)).toEqual(match.match(2));

	// @ts-expect-error
	expect(match.match({ age: 10 })).toEqual(match.match({ age: 10 }));

	// @ts-expect-error
	expect(match.match({ name: 'john' })).toEqual(
	// @ts-expect-error
		match.match({ name: 'john' })
	);
});

test('match complex', () => {
	let match = pattern(() => {
		throw new Error();
	})(
		(i: number[] | number): i is number[] => i instanceof Array,
		i => i.map((v): string => match(v)).join('; ')
	)(
		(i: number[] | number): i is number => typeof i == 'number',
		i => i.toString()
	).match;
	expect(match([1, 2, 3, 4])).toEqual('1; 2; 3; 4');
});
