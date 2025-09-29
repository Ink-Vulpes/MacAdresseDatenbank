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

export type Flattened<T> = UnionToIntersection<Flatten<T>>;

export type FlattenObj<T, Prefix extends string = ""> = {
	[K in keyof T & string as T[K] extends object
		? never
		: `${Prefix}${K}`]: T[K];
} & {
	[K in keyof T & string as T[K] extends object
		? `${Prefix}${K}_`
		: never]: T[K] extends object ? Flatten<T[K], `${Prefix}${K}_`> : never;
}[keyof T & string];
