import React from 'react'
import ApplicationSectionHeader from '../Application/ApplicationSectionHeader'
import InventoryList from './InventoryList'
import InventoryDrawer from './InventoryDrawer'
import './styles/inventory.css'

export default function Inventory(props) {
	return (
		<div className="inventory2-container">
			<ApplicationSectionHeader>Inventory</ApplicationSectionHeader>

			<div className="inventory2-content">
				<div className="inventory-list-container">
					<InventoryList />
				</div>
				<div className='inventory-drawer-container'>
					<InventoryDrawer />
				</div>
			</div>

		</div>
	)
}