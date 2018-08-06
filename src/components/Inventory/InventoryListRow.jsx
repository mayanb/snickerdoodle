import React from 'react'
import { formatAmount } from '../../utilities/stringutils'
import { inventoryName, formatProductCodes } from './inventoryUtils'
import InventoryIcon from './InventoryIcon'
import ObjectListItem from '../ObjectList/ObjectListItem'
import './styles/inventorylistrow.css'
import CategoryTag from '../CategoryTag/CategoryTag';

export default function InventoryListRow({item, onClick, isSelected}) {
	const { process_type, product_types, adjusted_amount } = item
	let className = isSelected ? 'selected-inv-row' : ''
	return (
		<ObjectListItem className={className} onClick={onClick}>
			<div className="inv-col inv-icon"><InventoryIcon icon={process_type.icon} /></div>
			<div className="inv-col inv-title">{inventoryName(item)}</div>
			<div className="inv-col inv-category"><CategoryTag category={process_type.category}/></div>
			<div className="inv-col inv-code">{`${process_type.code}-${formatProductCodes(product_types)}`}</div>
			<div className="inv-col inv-amount">{formatAmount(adjusted_amount, process_type.unit)}</div>
		</ObjectListItem>
	)
}