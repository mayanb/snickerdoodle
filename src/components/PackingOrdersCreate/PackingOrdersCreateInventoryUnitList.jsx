import React from 'react'
import update from 'immutability-helper'
import {pluralize} from '../Logic/stringutils'
import PackingOrdersCreateInventoryUnit from './PackingOrdersCreateInventoryUnit'

export default function PackingOrdersCreateInventoryUnitList(props) {
	return(
		<ul>
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
			<li>
				<button onClick={props.onAdd}>Add</button>
			</li>
		</ul>
	)
}