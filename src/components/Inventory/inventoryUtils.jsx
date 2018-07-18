export function inventoryName(inventory) {
	const { process_type, product_types } = inventory
	return `${process_type.name} ${formatProductCodes(product_types)}`
}

export function formatProductCodes(productTypes) {
	if (productTypes.length < 4) {
		return productTypes.map(p => p.code).join(', ')
	} else {
		const moreCount = productTypes.length - 2
		return `${productTypes.slice(0, 2).map(p => p.code).join(', ')} + ${moreCount} more`
	}
}
