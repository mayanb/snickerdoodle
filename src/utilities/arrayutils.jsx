
export function findPosition(array, item, comparator) {
	if (!comparator)
		return array.length
	return positionHelper(array, item, comparator, 0, array.length - 1)
}

function positionHelper(array, item, comparator, start, end) {

	// base case
	if (end <= start) {
	return start
	}

	let center = Math.trunc((start + end)/2)
	let result = comparator(item, array[center])

	if (result == -1) 
	return positionHelper(array, item, comparator, start, center - 1)

	if (result == 1) 
	return positionHelper(array, item, comparator, center+1, end)

	if (result == 0)
	return center

}

export function alphabetize(a, b) {
  if (a == b || a==null || b==null) 
    return 0

  let aName = a.code.toUpperCase()
  let bName = b.code.toUpperCase()

  if (aName < bName) 
    return -1
  if (aName > bName)
    return 1

  return 0
}

export function sortByAccountType(a, b) {
	if (a == b || !a || !b) {
		return 0
	}

	if (a.account_type < b.account_type) {
		return -1
	}
	if (a.account_type > b.account_type) {
		return 1
	}
	return 0
}

export function sortByRank(a, b) {
	if (a == b || !a || !b) {
		return 0
	}

	return parseInt(a.rank) - parseInt(b.rank)
}