const SUGGESTED_NUM_TICKS = 3

export function findBestBucketSize(num) {
	// handle case where num is zero
	if(num <= 0)
		return 1

	let okBucketSizes = [1, 2, 3, 4, 5, 10, 25, 50, 100, 200, 250, 500, 1000, 2000, 5000, 10000, 25000, 50000, 100000]
	let calculatedBucketSize = num/(SUGGESTED_NUM_TICKS+1) // add 1 to get the number of buckets

	// if its a decimal just do whatever it calculates
	if (calculatedBucketSize < 1) {
		return calculatedBucketSize
	}

	// otherwise find the first bucket that's bigger than calc bucket
  let curr = num
  for(var i in okBucketSizes) {
  	let b = okBucketSizes[i]
  	let bDiff = Math.abs(curr - b) 
  	let currDiff = Math.abs(calculatedBucketSize - curr)
  	if (bDiff < currDiff) {
      curr = b
  	}
  }
  return curr
}

export function getTicks(bucketSize, num) {
	let numTicks = Math.round(num/bucketSize) - 1
	let ticks = []
	for(var i = 0; i < numTicks+1; i++) {
		ticks.push(bucketSize * (i+1))
	}
	return ticks
}