import React from 'react'
import ObjectListItem from '../ObjectList/ObjectListItem'
import OverflowSafeText from '../OverflowSafeText/OverflowSafeText'
import {formatAmount} from "../../utilities/stringutils"
import Icon from '../Card/Icon'

export default function ActivityListItem({ item, onClick }) {
	const { process_code, process_name, product_code, runs, outputs, process_unit } = item
	
	return (
		<ObjectListItem className="activity-list-item" onClick={onClick}>
			<OverflowSafeText className="process-code">
				<Icon src="" size="20px" content={process_code}/>
				{process_code}
			</OverflowSafeText>
			<OverflowSafeText className="process-name">
				{process_name}
			</OverflowSafeText>
			<OverflowSafeText className="product-code">
				{product_code}
			</OverflowSafeText>
			<OverflowSafeText className="runs">
				{formatAmount(Number(runs), 'run')}
			</OverflowSafeText>
			<OverflowSafeText className="outputs">
				{formatAmount(Number(outputs), process_unit)}
			</OverflowSafeText>
		</ObjectListItem>
	)
}