import React from 'react'
import Select from 'react-select'

export default function PackingOrdersCreateInventoryUnit(props) {
	return (
		<div className="packingorders-create-inventory-unit">
			<div className="inventory-unit-title">
				<Select
					openOnFocus
					value={props.order_inventory_unit.inventory_unit}
					options={props.inventoryUnits}
					labelKey={'name'}
					valueKey={'id'}
					placeholder="Select a product"
					onChange={(newVal) => props.onInputChange('inventory_unit', newVal)}
				/>
			</div>
			<div className="inventory-unit-amount">
				<input 
					type="text" 
					name="amount"
					placeholder="0" 
					value={props.order_inventory_unit.amount_description}
					onChange={(e) => props.onInputChange('amount_description', e.target.value)} 
				/>
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