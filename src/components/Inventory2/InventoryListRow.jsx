import React from 'react'
import { pluralize, formatNumber } from '../../utilities/stringutils'
import InventoryIcon from './InventoryIcon'

export default function InventoryListRow({item, onClick, isSelected}) {
	let {
		process_name, 
		product_name, 
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
			<div className="inv-col inv-title">{`${process_name} ${product_name}`}</div>
			<div className="inv-col inv-code">{`${process_code}-${product_code}`}</div>
			<div className="inv-col inv-amount">{`${formatNumber(amount)} ${pluralize(amount,unit)}`}</div>
		</div>
	)
}