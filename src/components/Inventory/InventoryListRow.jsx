import React from 'react'
import { formatAmount } from '../../utilities/stringutils'
import { inventoryName } from './inventoryUtils'
import InventoryIcon from './InventoryIcon'
import ObjectListItem from '../ObjectList/ObjectListItem'
import './styles/inventorylistrow.css'
import CategoryTag from '../CategoryTag/CategoryTag';

export default function InventoryListRow({item, onClick, isSelected}) {
	let {
		process_code,
		product_code, 
		process_icon: icon,
		adjusted_amount: amount, 
		process_unit: unit,
		process_category
	} = item
	let className = isSelected ? 'selected-inv-row' : ''
	return (
		<ObjectListItem className={className} onClick={onClick}>
			<div className="inv-col inv-icon"><InventoryIcon icon={icon} /></div>
			<div className="inv-col inv-title">{inventoryName(item)}</div>
			<div className="inv-col inv-category"><CategoryTag category={process_category}/></div>
			<div className="inv-col inv-code">{`${process_code}-${product_code}`}</div>
			<div className="inv-col inv-amount">{formatAmount(amount, unit)}</div>
		</ObjectListItem>
	)
}