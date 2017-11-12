import React from 'react'
import update from 'immutability-helper'
import {pluralize} from '../Logic/stringutils'
import {data} from './data'
import PackingOrdersCreateInventoryUnit from './PackingOrdersCreateInventoryUnit'

let data1 = update(data, {order_inventory_unit: {amount: {$set: '100 cases'}}})
let data2 = update(data, {order_inventory_unit: {amount: {$set: '200 cases'}}})

export default class PackingOrdersCreateInventoryUnitList extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			isAddingListItem: false,
			inventoryUnits: [data, data1, data2]
		}
	}

	render() {
		return(
			<ul>
			{
				this.state.inventoryUnits.map(function(unit, i) {
					return (
						<li key={i}>
							<PackingOrdersCreateInventoryUnit 
								inventoryUnit={unit.order_inventory_unit} 
								onRemove={() => this.handleRemoveInventoryUnit(i)}
							/>
						</li>
					)
				}, this)
			}
				<li>
				</li>
			</ul>
		)
	}

	handleAddNewListItem() {
		let ns = update(this.state.inventoryUnits, {
			$push: [data]
		})
		this.setState(ns)
	}

	handleRemoveInventoryUnit(index) {
		let ns = update(this.state.inventoryUnits, {
			$splice: [[index,1,]]
		})
		this.setState({inventoryUnits: ns})
	}
}