import React from 'react'
import ObjectListItem from '../ObjectList/ObjectListItem'
import OverflowSafeText from '../OverflowSafeText/OverflowSafeText'
import {formatAmount} from "../../utilities/stringutils"
import Icon from '../Card/Icon'

export default function ActivityListItem({ item, onClick }) {
	const { process_type, product_types, runs, amount } = item
	
	return (
		<ObjectListItem className="activity-list-item" onClick={onClick}>
			<OverflowSafeText className="process-code">
				<Icon src="" size="20px" content={process_type.code}/>
				{process_type.code}
			</OverflowSafeText>
			<OverflowSafeText className="process-name">
				{process_type.name}
			</OverflowSafeText>
			<OverflowSafeText className="product-code">
				{product_types[0].code}
			</OverflowSafeText>
			<OverflowSafeText className="runs">
				{formatAmount(Number(runs), 'run')}
			</OverflowSafeText>
			<OverflowSafeText className="outputs">
				{formatAmount(Number(amount), process_type.unit)}
			</OverflowSafeText>
			<div className="view-all-tasks">View all tasks</div>
		</ObjectListItem>
	)
}