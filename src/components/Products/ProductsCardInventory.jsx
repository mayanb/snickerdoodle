import React from 'react'

const INVENTORY_PAGE_SIZE = 5

export default function ProductsCardInventory(props) {
	let {inventoryData, ui} = props

	if (ui.isFetchingData) {
		return <span>Loading...</span>
	}

	let inventory = inventoryData

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
	console.log(inventory)
	// return <span>{`${inventory.length - INVENTORY_PAGE_SIZE} more items >`}</span>
	return <a className="inventorylink" href="/inventory">view full inventory</a>


}