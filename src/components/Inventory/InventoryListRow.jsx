import React from 'react'
import { formatAmount } from '../../utilities/stringutils'
import { shortInventoryName, inventoryName, formatCost } from './inventoryUtils'
import InventoryIcon from './InventoryIcon'
import ObjectListItem from '../ObjectList/ObjectListItem'
import './styles/inventorylistrow.css'
import CategoryTag from '../CategoryTag/CategoryTag';

export default function InventoryListRow({item, onClick, isSelected}) {
	const { process_type, adjusted_amount, adjusted_cost } = item
	let className = isSelected ? 'selected-inv-row' : ''
	return (
		<ObjectListItem className={className} onClick={onClick}>
			<div className="inv-col inv-icon"><InventoryIcon icon={process_type.icon} /></div>
			<div className="inv-col inv-title">{inventoryName(item)}</div>
			<div className="inv-col inv-category"><CategoryTag category={process_type.category}/></div>
			<div className="inv-col inv-code">{shortInventoryName(item)}</div>
			<div className="inv-col inv-amount">{formatAmount(adjusted_amount, process_type.unit)}</div>
			<div className="inv-col inv-cost">{formatCost(adjusted_cost)}</div>
		</ObjectListItem>
	)
}