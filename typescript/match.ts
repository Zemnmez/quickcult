export interface Match<I, O> {
	<I2, IM extends I2, O2>(t: (v: I2) => v is IM, f: (v: IM) => O2): Match<
		I & I2,
		O | O2
	>;
	match(v: I): O;
}

export function pattern<I, O>(fb: (i: I) => O): Match<I, O> {
	function ret<I2, IM extends I2, O2>(
		t: (v: I2) => v is IM,
		f: (v: IM) => O2
	): Match<I & I2, O | O2> {
		return pattern<I & I2, O | O2>((i: I & I2) => (t(i) ? f(i) : fb(i)));
	}

	ret.match = (v: I): O => fb(v);
	return ret as any;
}

export default pattern;
