import React from 'react'
import ObjectListItem from '../ObjectList/ObjectListItem'
import OverflowSafeText from '../OverflowSafeText/OverflowSafeText'
import {formatAmount} from "../../utilities/stringutils"
import Icon from '../Card/Icon'

export default function ActivityListItem({ item, index, onViewTasks, onDownload }) {
	const { process_type, product_types, runs, amount } = item

	return (
		<ObjectListItem className="activity-list-item">
			<OverflowSafeText className="process-code">
				<Icon src="" size="20px" content={process_type.code}/>
				{process_type.code}
			</OverflowSafeText>
			<OverflowSafeText className="process-name">
				{process_type.name}
			</OverflowSafeText>
			<OverflowSafeText className="product-code">
				{formatProductCodes(product_types)}
			</OverflowSafeText>
			<OverflowSafeText className="runs">
				{formatAmount(Number(runs), 'run')}
			</OverflowSafeText>
			<OverflowSafeText className="outputs">
				{formatAmount(Number(amount), process_type.unit)}
			</OverflowSafeText>
			<div className="view-all-tasks" onClick={() => onViewTasks(index)}>View all tasks</div>
			<i className="material-icons download" onClick={() => onDownload(index)}>file_download</i>
		</ObjectListItem>
	)
}

function formatProductCodes(productTypes) {
	if (productTypes.length < 4) {
		return productTypes.map(p => p.code).join(', ')
	} else {
		const moreCount = productTypes.length - 2
		return `${productTypes.slice(0, 2).map(p => p.code).join(', ')} + ${moreCount} more`
	}
}