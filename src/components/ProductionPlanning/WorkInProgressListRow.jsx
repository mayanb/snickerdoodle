import React from 'react'
import { formatAmount, getProcessIcon } from "../../utilities/stringutils"
import ObjectListItem from '../ObjectList/ObjectListItem'
import Img from '../Img/Img'
import './styles/workinprogresslistrow.css'

export default function WorkInProgressListRow({item, onClick, isSelected}) {
    //console.log('item', item)
	const { process_type, product_type, adjusted_amount } = item
	let className = isSelected ? 'selected-inv-row' : ''
	return (
		<ObjectListItem className={className} onClick={onClick}>
			<div className="inv-icon">
					<Img className="icon-img" src={getProcessIcon(process_type.icon)} />
			</div>
			<div className="inv-col inv-product">{inventoryCodeName(process_type, product_type)}</div>
			<div className="inv-col inv-in-stock">{formatAmount(adjusted_amount, process_type.unit)}</div>
			<div className="inv-col inv-can-make">-</div>
		</ObjectListItem>
	)
}

function inventoryCodeName(process, product) {
    return `${process.code}-${product.code}`
}