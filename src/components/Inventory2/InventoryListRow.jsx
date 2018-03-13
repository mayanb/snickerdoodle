import React from 'react'
import { formatAmount } from '../../utilities/stringutils'
import { inventoryName } from './inventoryUtils'
import InventoryIcon from './InventoryIcon'

export default function InventoryListRow({item, onClick, isSelected}) {
	let {
		process_code,
		product_code, 
		process_icon: icon,
		adjusted_amount: amount, 
		process_unit: unit
	} = item
	let className = 'inv-row ' + (isSelected ? 'selected-inv-row' : '')
	return (
		<div className={className} onClick={onClick}>
			<div className="inv-col inv-icon"><InventoryIcon icon={icon} /></div>
			<div className="inv-col inv-title">{inventoryName(item)}</div>
			<div className="inv-col inv-code">{`${process_code}-${product_code}`}</div>
			<div className="inv-col inv-amount">{formatAmount(amount, unit)}</div>
		</div>
	)
}