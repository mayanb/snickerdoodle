import React from 'react'

export default function PackingOrdersCreateInventoryUnit(props) {
	return (
		<div className="packingorders-create-inventory-unit">
			<div className="inventory-unit-title">
				<span>{getTitle(props.inventoryUnit)}</span>
			</div>
			<div className="inventory-unit-amount">
				<span>{props.inventoryUnit.amount}</span>
			</div>
			<div className="inventory-unit-remove">
				<span onClick={props.onRemove}><i className="material-icons">close</i></span>
			</div>
		</div>
	)
}

function getTitle(inventoryUnit) {
	return inventoryUnit.product.name + " - " + inventoryUnit.process.output_desc
}