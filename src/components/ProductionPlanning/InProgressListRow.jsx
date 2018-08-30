import React from 'react'
import { formatAmount, getProcessIcon } from "../../utilities/stringutils"
import ObjectListItem from '../ObjectList/ObjectListItem'
import OverflowSafeText from '../OverflowSafeText/OverflowSafeText'
import CategoryTag from '../CategoryTag/CategoryTag'
import Img from '../Img/Img'
import './styles/inprogresslistrow.css'

export default function InProgressListRow({item, onClick, isSelected, context}) {
	const { process_type, product_type, adjusted_amount, can_make } = item
	const { selectedProcess } = context
	let className = isSelected ? 'selected-inv-row' : ''
	return (
		<ObjectListItem className={className} onClick={onClick}>
			<div className="inv-icon">
					<Img className="icon-img" src={getProcessIcon(process_type.icon)} />
			</div>
			<div className='inv-col inv-product'>
				<OverflowSafeText tooltipText={`${process_type.name} ${product_type.name}`}>
					{inventoryCodeName(process_type, product_type)}
				</OverflowSafeText>
			</div>
			<div className='inv-col inv-category'><CategoryTag category={process_type.category} /></div>
			<div className='inv-col inv-in-stock'>{formatAmount(adjusted_amount, process_type.unit)}</div>
			<div className='inv-col inv-can-make'>{formatAmount(can_make, selectedProcess.unit)}</div>
		</ObjectListItem>
	)
}

function inventoryCodeName(process, product) {
    return `${process.code}-${product.code}`
}