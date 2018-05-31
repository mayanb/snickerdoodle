export function dashboardPath(selectedProcess, selectedProducts) {
	const qs = new URLSearchParams()
	qs.set('selectedProcess', selectedProcess)
	qs.set('selectedProducts', selectedProducts)
	return`/?${qs.toString()}`
}
