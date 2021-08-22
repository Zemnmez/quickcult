import pattern from '//typescript/match';

test('match', () => {
	const match = pattern(() => undefined)
		((v: { name: string }): v is {name: 'john'}  => v.name == 'john', () => 'hi john!' as const )
		((v: { age: number }): v is {age: 20}  => v.age == 20, () => 'you are 20 years old' as const);

	expect(match.match({ name: 'whatever', age: 10})).toEqual(undefined);
	expect(match.match({ name: 'john', age: 10})).toEqual('hi john!');
	expect(match.match({ name: 'somethign', age: 20})).toEqual('you are 20 years old');

	// @ts-expect-error
	expect(match.match(2)).toEqual(undefined)
})
