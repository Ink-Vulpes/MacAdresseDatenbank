export default function <T>(h: Array<Array<T>>, n: Array<T>) {
	return h.some(
		(arr) => arr.length == n.length && arr.every((val, i) => val === n[i])
	);
}
