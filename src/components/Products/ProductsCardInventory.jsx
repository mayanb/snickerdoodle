import React from 'react'

const INVENTORY_PAGE_SIZE = 5

export default function ProductsCardInventory(props) {
	let {items, ui, inventories} = props

	if (ui.isFetchingInventory) {
		return <span>Loading...</span>
	}

	let inventory = inventories[ui.selectedItem]

	return (
		<div>
			<h2>Inventory</h2>
			{ renderInventoryList(inventory) }
		</div>
	)
}

function renderInventoryList(inventory) {
	if (!inventory || inventory.length == 0) {
		return <span className="products-card-description-empty">No items</span>
	}

	return (
		<div>
			<ul className="products-card-inventory">
			{
				inventory.map(function (item, i) {
					if (i < INVENTORY_PAGE_SIZE)
						return renderListItem(item, i)
				})
			}
			</ul>
			{ renderRemainderLink(inventory) }
		</div>
	)
}

function renderListItem(item, i) {
	return (
		<li className="products-card-inventory-item">
			<div>
				{ item.output_desc }
			</div>
			<div>
				{ `${Math.round(item.count)} ${item.unit}`}
			</div>
		</li>
	)
}

function renderRemainderLink(inventory) {
	if (inventory.length <= INVENTORY_PAGE_SIZE)
		return null

	return <span>{`${inventory.length - INVENTORY_PAGE_SIZE} more items >`}</span>

}