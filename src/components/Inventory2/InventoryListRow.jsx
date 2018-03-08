import React from 'react'

export default function InventoryListRow({item, onClick}) {
	return (
		<div onClick={onClick}>
			{JSON.stringify(item)}
		</div>
	)
}