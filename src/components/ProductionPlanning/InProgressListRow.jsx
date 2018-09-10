import React from 'react'
import { formatAmount, getProcessIcon } from "../../utilities/stringutils"
import ObjectListItem from '../ObjectList/ObjectListItem'
import OverflowSafeText from '../OverflowSafeText/OverflowSafeText'
import CategoryTag from '../CategoryTag/CategoryTag'
import Img from '../Img/Img'
import { Link } from 'react-router-dom'
import './styles/inprogresslistrow.css'

export default function InProgressListRow({item, isSelected, context}) {
	const { process_type, product_type, adjusted_amount, can_make, warning } = item
	const { selectedProcess } = context
	let className = isSelected ? 'selected-inv-row' : ''
	return (
		<Link target='_blank' to={`/inventory?selectedProcesses=${process_type.id}&selectedProducts=${product_type.id}`}>
			<ObjectListItem className={className}>
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
				<div className='inv-col inv-warning'>
					{ warning && process_type.category === 'rm' &&
						<Img src='warning@2x'/>
					}
				</div>
			</ObjectListItem>
		</Link>
	)
}

function inventoryCodeName(process, product) {
    return `${process.code}-${product.code}`
}