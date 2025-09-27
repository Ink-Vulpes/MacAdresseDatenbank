export type FixedLengthArray<
	T,
	L extends number,
	R extends T[] = []
> = R["length"] extends L ? R : FixedLengthArray<T, L, [...R, T]>;

export type Flatten<T> = {
	[K in keyof T]: T[K] extends readonly (infer U)[]
		? { [I in keyof T[K] & `${number}` as `${Extract<K, string>}_${I}`]: U }
		: { [P in K]: T[K] };
}[keyof T];

type UnionToIntersection<U> = (U extends any ? (x: U) => void : never) extends (
	x: infer I
) => void
	? I
	: never;

type Flattened<T> = UnionToIntersection<Flatten<T>>;
