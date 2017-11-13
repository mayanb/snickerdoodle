import React from 'react'
import { connect } from 'react-redux'
import update from 'immutability-helper'
import Button from '../Card/Button'
import Dialog from '../Card/Dialog'
import DialogHeader from '../Dialog/DialogHeader'
import * as actions from '../PackingOrders/PackingOrdersActions'
import PackingOrdersCreateContact from './PackingOrdersCreateContact'
import PackingOrdersCreateInventoryUnitList from './PackingOrdersCreateInventoryUnitList'

class PackingOrdersCreateDialog extends React.Component {
	constructor(props) {
		super(props)

		this.handleCreatePackingOrder = this.handleCreatePackingOrder.bind(this)
		this.handleRemoveInventoryUnit = this.handleRemoveInventoryUnit.bind(this)
		this.handleChangeInventoryUnit = this.handleChangeInventoryUnit.bind(this)
		this.handleAddNewListItem = this.handleAddNewListItem.bind(this)
		this.handleChangeContact = this.handleChangeContact.bind(this)

		this.state = {
			order_inventory_units: [{inventory_unit: null, amount_description: ""}],
			selected_contact: null,
		}

	}

  componentDidMount() {
    this.props.dispatch(actions.fetchInventoryUnits())
    this.props.dispatch(actions.fetchContacts())
  }

	render() {
		return (
			<Dialog onToggle={this.props.onToggle} className="packingorders-create">
				<DialogHeader>Create a packing order</DialogHeader>
				<PackingOrdersCreateContact 
					selected_contact={this.state.selected_contact} 
					contacts={this.props.contacts.data}
					onChange={this.handleChangeContact}
				/>
				<PackingOrdersCreateInventoryUnitList 
					inventoryUnits = {this.props.inventoryUnits.data}
					order_inventory_units={this.state.order_inventory_units} 
					onRemove={this.handleRemoveInventoryUnit}
					onAdd={this.handleAddNewListItem}
					onChange={this.handleChangeInventoryUnit}
				/>
				<div className="button-area">
					<Button secondary onClick={this.props.onToggle}>Cancel</Button>
					<Button onClick={(e) => this.handleCreatePackingOrder()}>Create</Button>
				</div>
			</Dialog>
		)
	}

	handleCreatePackingOrder() {
		let contact = this.state.selected_contact.id
		let inventory_unit_data = this.state.order_inventory_units.map(function (unit, i) {
			return {inventory_unit: unit.inventory_unit.id, amount_description: unit.amount_description}
		})
		console.log(inventory_unit_data)
		let data = {"ordered_by": contact, "order_inventory_unit_data": inventory_unit_data}
    	this.props.dispatch(actions.postCreatePackingOrder(data))    
	}

	handleChangeInventoryUnit(index, keyword, newVal) {
		let ns = update(this.state.order_inventory_units, {
			[index]: {
				[keyword]: {
					$set: newVal
				}
			}
		})
		this.setState({order_inventory_units: ns})
	}

	handleAddNewListItem() {
		let ns = update(this.state.order_inventory_units, {
			$push: [{inventory_unit: null, amount_description: ""}]
		})
		this.setState({order_inventory_units: ns})
	}

	handleRemoveInventoryUnit(index) {
		let ns = update(this.state.order_inventory_units, {
			$splice: [[index,1,]]
		})
		this.setState({order_inventory_units: ns})
	}

	handleChangeContact(newVal) {
		this.setState({selected_contact: newVal})
	}


}

const mapStateToProps = (state/*, props*/) => {
  return {
    packingOrders: state.packingOrders,
    contacts: state.contacts,
    inventoryUnits: state.inventoryUnits,
  }
}

const connectedPackingOrdersCreateDialog = connect(mapStateToProps)(PackingOrdersCreateDialog)

export default connectedPackingOrdersCreateDialog