import React from 'react'
import ObjectListItem from '../ObjectList/ObjectListItem'
import OverflowSafeText from '../OverflowSafeText/OverflowSafeText'
import { formatAmount } from "../../utilities/stringutils"
import Img from '../Img/Img'
import { getProcessIcon } from "../../utilities/stringutils"
import { Link } from 'react-router-dom'


export default class ActivityListItem extends React.Component {
	handleDownload(e, index) {
		this.props.onDownload(index)
		e.stopPropagation()
	}

	render() {
		const { item, index, onViewTasks } = this.props
		const { process_type, product_types, runs, amount } = item
		return (
			<ObjectListItem className="activity-list-item" onClick={() => onViewTasks(index)}>
				<div className="icon">
					<Img className="icon-img" src={getProcessIcon(process_type.icon)} />
				</div>
				<OverflowSafeText className="process-code">
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
				<div className="view-all-tasks">View all tasks</div>
				<i className="material-icons download" onClick={(e) => this.handleDownload(e, index)}>file_download</i>
				<ChartLink process_type={process_type} product_types={product_types} />
			</ObjectListItem>
		)
	}
}

function ChartLink({process_type, product_types}) {
	const selectedProcess = process_type.id
	const selectedProducts = product_types.map(p => p.id)
	const qs = new URLSearchParams()
	qs.set('selectedProcess', selectedProcess)
	qs.set('selectedProducts', selectedProducts.join(',') )
	const path = `/?${qs.toString()}`
	return (
		<Link to={path} className="chart">
			<i className="material-icons">show_chart</i>
		</Link>
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