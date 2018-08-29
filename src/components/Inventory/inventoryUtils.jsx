export function shortInventoryName(item) {
	const { process_type, product_types } = item
	return process_type.code + '-' + formatProductCodes(product_types)
}

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

export function formatCost(value) {
	return '$' + value.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
