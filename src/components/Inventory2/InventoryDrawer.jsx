import React from 'react'
import { connect } from 'react-redux'
import InventoryIcon from './InventoryIcon'
import InventoryDrawerAdjustedAmount from './InventoryDrawerAdjustedAmount'
import './styles/inventorydrawer.css'

function InventoryDrawer({data, ui,selectedInventory}) {
	if (!selectedInventory) {
		return null
	}

	return (
		<div className="inventory-drawer">
			<DrawerTitle inventory={selectedInventory}/>
			<InventoryDrawerAdjustedAmount inventory={selectedInventory} />
		</div>
	)
}

function DrawerTitle({inventory}) {
	let { process_name, product_name } = inventory
	return (
		<div className="inv-drawer-title">
			<InventoryIcon icon={inventory.process_icon} outerSize={36} innerSize={24} />
			<span>{`${process_name} ${product_name}`}</span>
		</div>
	)
}

const mapStateToProps = (state/*, props*/) => {
	let data = state.inventory2.data
	let ui = state.inventory2.ui
	let selectedInventory = ui.selectedItem && data[ui.selectedItem]
	return {
		data: data,
		ui: ui,
		selectedInventory: selectedInventory,
	}
}

export default connect(mapStateToProps)(InventoryDrawer)

