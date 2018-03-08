import React from 'react'

export default function InventoryListRow({item, onClick, isSelected}) {
	let className = 'inv-row ' + (isSelected ? 'selected-inv-row' : '')
	return (
		<div className={className} onClick={onClick}>
			{item.display}
		</div>
	)
}