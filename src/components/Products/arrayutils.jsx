
export default function findPosition(array, item, comparator) {
	return positionHelper(array, item, comparator, 0, array.length - 1)
}

function positionHelper(array, item, comparator, start, end) {

	// base case
	if (start == end) {
		return start + comparator(item, array[start])
	}


	let center = (start + end)/2
	let result = comparator(item, array[center])

	if (result == -1) 
		return positionHelper(array, item, comparator, start, center-1)

	if (result == 1) 
		return positionHelper(array, item, comparator, center+1, end)

	if (result == 0)
		return center

}