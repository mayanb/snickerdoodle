import React from 'react'
import update from 'immutability-helper'
import {pluralize} from '../../utilities/stringutils'
import PackingOrdersCreateInventoryUnit from './PackingOrdersCreateInventoryUnit'
import Button from '../Card/Button'

export default function PackingOrdersCreateInventoryUnitList(props) {
	return(
		<ul>
			<li className="packingorders-inventoryunitlist-header">
				{ (props.order_inventory_units && props.order_inventory_units.length > 0)?
						<PackingOrdersCreateInventoryUnitHeader />:
						null
				}
			</li>
			{
				props.order_inventory_units.map(function(unit, i) {
					return (
						<li key={i}>
							<PackingOrdersCreateInventoryUnit 
								order_inventory_unit={unit} 
								inventoryUnits = {props.inventoryUnits}
								onInputChange={(keyword, newVal) => props.onChange(i, keyword, newVal)}
								onRemove={() => props.onRemove(i)}
							/>
						</li>
					)
				})
			}
			<li className="add-line-item">
				<Button link onClick={props.onAdd}>+ Add line item</Button>
			</li>
		</ul>
	)
}

function PackingOrdersCreateInventoryUnitHeader(props) {
	return (
		<div className="packingorders-create-inventory-unit header">
			<div className="inventory-unit-title">
				<span className="dialog-input-label">Product</span>
			</div>
			<div className="inventory-unit-amount">
				<span className="dialog-input-label">Quantity</span>
			</div>
			<div style={{flex: 0, flexBasis:"16px"}} />
		</div>
	)
}