import React from 'react'

export default function PackingOrdersListRow(props) {
	return (
		<div className={"packingorder-list-row " + (props.isHeader?"packingorder-list-header":"")}>
			<span>{JSON.stringify(props.item)}</span>
		</div>
	)
}