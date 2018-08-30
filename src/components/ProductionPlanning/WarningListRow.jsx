import React from 'react'
import { formatAmount } from "../../utilities/stringutils"
import ObjectListItem from '../ObjectList/ObjectListItem'
import OverflowSafeText from '../OverflowSafeText/OverflowSafeText'
import moment from 'moment'
import './styles/warninglistrow.css'

export default function WarningListRow({item, onClick, isSelected}) {
    const { process_type, product_type, adjusted_amount, date_exhausted } = item
	let className = isSelected ? 'selected-inv-row' : ''
	return (
		<ObjectListItem className={className} onClick={onClick}>
			<div className="inv-col inv-product">
				<OverflowSafeText tooltipText={`${process_type.name} ${product_type.name}`}>
					{inventoryCodeName(process_type, product_type)}
				</OverflowSafeText>
			</div>
			<div className="inv-col inv-in-stock">{formatAmount(adjusted_amount, process_type.unit)}</div>
			<div className="inv-col inv-date-exhausted">{moment(date_exhausted).format('MM/DD/YYYY')}</div>
		</ObjectListItem>
	)
}

function inventoryCodeName(process, product) {
    return `${process.code}-${product.code}`
}