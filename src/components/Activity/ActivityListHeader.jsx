import React from 'react'
import ObjectListHeader from '../ObjectList/ObjectListHeader'

export default function ActivityTableHeader() {
	return (
		<ObjectListHeader>
			<div className="activity-list-item activity-list-header">
				<div className="process-code"/>
				<div className="process-name">Process Type</div>
				<div className="product-code">Product Type</div>
				<div className="runs">Runs</div>
				<div className="outputs">Amount</div>
				<div className="view-all-tasks"/>
			</div>
		</ObjectListHeader>
	)
}