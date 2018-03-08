import React from 'react'
import ApplicationSectionHeader from '../Application/ApplicationSectionHeader'
import InventoryList from './InventoryList'
import './styles/inventory.css'

export default function Inventory(props) {
	return (
		<div className="inventory2-container">
			<ApplicationSectionHeader>Inventory</ApplicationSectionHeader>
			<InventoryList />
		</div>
	)
}