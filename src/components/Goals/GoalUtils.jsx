// Returns a unique process/product(s) identifier used as the key of the hashmap to group weekly/monthly goals
export const getProductProcessKey = (goal) => {
	const productIDs = goal.all_product_types ? 'ALL' : goal.product_code.map(product => product.id).sort().join(',')
	return `${productIDs}_${String(goal.process_type)}`
}