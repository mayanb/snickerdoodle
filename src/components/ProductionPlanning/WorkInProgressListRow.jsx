import React from 'react'
import { formatAmount } from '../../utilities/stringutils'
import ObjectListItem from '../ObjectList/ObjectListItem'
import './styles/workinprogresslistrow.css'

export default function WorkInProgressListRow({item, onClick, isSelected}) {
    //console.log('item', item)
	const { process_type, product_type, adjusted_amount } = item
	let className = isSelected ? 'selected-inv-row' : ''
	return (
		<ObjectListItem className={className} onClick={onClick}>
			<div className="inv-col inv-product">{inventoryCodeName(process_type, product_type)}</div>
			<div className="inv-col inv-in-stock">{adjusted_amount}</div>
			<div className="inv-col inv-can-make">-</div>
		</ObjectListItem>
	)
}

function inventoryCodeName(process, product) {
    return `${process.code}-${product.code}`
}