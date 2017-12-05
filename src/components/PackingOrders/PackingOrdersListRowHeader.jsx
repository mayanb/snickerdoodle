import React from 'react'
import PackingOrdersListRow from './PackingOrdersListRow'

export default function PackingOrderListRowHeader(props) {
	let headerName = "Packing Orders"
	return <PackingOrdersListRow item={headerName} isHeader={true} />
}