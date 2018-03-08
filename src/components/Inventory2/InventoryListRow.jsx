import React from 'react'
import { pluralize } from '../../utilities/stringutils'
import Img from '../Img/Img'

const DEFAULT_ICON = '/img/default@3x.png'

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

function InventoryIcon({icon}) {
	return (
		<div className="icon-circ">
			<Img 
				height={16}
				src={icon.substring(0, icon.length - 4) + "@3x"} 
				onError={e => e.target.src = DEFAULT_ICON}
			/>
		</div>
	)
}

function formatNumber(amount) {
	return parseInt(amount, 10).toLocaleString()
}