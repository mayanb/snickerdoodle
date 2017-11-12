import React from 'react'
import Button from '../Card/Button'
import Dialog from '../Card/Dialog'
import Select from 'react-select';
import * as actions from './PackingOrdersActions.jsx'
import { connect } from 'react-redux'

class PackingOrdersCreateDialog extends React.Component {
	constructor(props) {
		super(props)
		this.state = {selected_contact: null, inventory_unit: null}
		this.handleCreatePackingOrder = this.handleCreatePackingOrder.bind(this)

	}

  componentDidMount() {
    //this.props.dispatch(actions.fetchPackingOrders())
    this.props.dispatch(actions.fetchContacts())
    this.props.dispatch(actions.fetchInventoryUnits())

  }

	render() {
		return (
			<Dialog onToggle={this.props.onToggle}>
				<h2>Create a new packing order</h2>
				
				<div>
					<Select
						openOnFocus
						value={this.state.selected_contact}
						options={this.props.contacts.data}
						labelKey={'name'}
						valueKey={'id'}
						placeholder="Select a contact for this order"
						onChange={(newVal) => this.onInputChange('selected_contact', newVal)}
					/>
				</div>
				<div>
					<Select
						openOnFocus
						value={this.state.inventory_unit}
						options={this.props.inventoryUnits.data}
						labelKey={'name'}
						valueKey={'id'}
						placeholder="Select a inventory unit for this order"
						onChange={(newVal) => this.onInputChange('inventory_unit', newVal)}
					/>
				</div>

				<div className="button-area">
					<Button secondary onClick={this.props.onToggle}>Cancel</Button>
					<Button onClick={(e) => this.handleCreatePackingOrder()}>Create</Button>
				</div>
			</Dialog>
		)
	}

	onInputChange(key, val) {
		this.setState({[key]: val})
	}

	handleCreatePackingOrder() {
		contact = this.state.selected_contact
		inventory_unit_data = this.state.inventory_unit
		data = {"ordered_by": contact, "order_inventory_unit_data": inventory_unit_data}
    	this.props.dispatch(actions.postCreatePackingOrder(data))    
	}
}

const mapStateToProps = (state/*, props*/) => {
  console.log(state)
  return {
    packingOrders: state.packingOrders,
    contacts: state.contacts,
    inventoryUnits: state.inventoryUnits,
  }
}

const connectedPackingOrdersCreateDialog = connect(mapStateToProps)(PackingOrdersCreateDialog)

export default connectedPackingOrdersCreateDialog