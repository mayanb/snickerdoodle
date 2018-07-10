import React from 'react'
import ObjectListItem from '../ObjectList/ObjectListItem'
import OverflowSafeText from '../OverflowSafeText/OverflowSafeText'
import { formatAmount, getProcessIcon } from "../../utilities/stringutils"
import Pill from '../Pill/Pill'
import Img from '../Img/Img'
import { dashboardPath } from "../../utilities/urlutils"
import { Link } from 'react-router-dom'
import { Tag } from 'antd';


export default class ActivityListItem extends React.Component {
	handleDownload(e, index) {
		this.props.onDownload(index)
		e.stopPropagation()
	}

	render() {
		const { item, index, onViewTasks } = this.props
		const { process_type, product_types, runs, amount } = item
		let category_name = "Work in Progress"
		let category_color = "#40B3FF"
		if(process_type.category !== "wip"){
			process_type.category === 'rm' ? category_name = "Raw Material" : category_name = "Finished Goods"
			process_type.category === 'rm' ? category_color = "#F2A51F" : category_color = "#5BD069"
		}
		return (
			<ObjectListItem className="activity-list-item" onClick={() => onViewTasks(index)}>
				<div className="icon">
					<Img className="icon-img" src={getProcessIcon(process_type.icon)} />
				</div>
				<OverflowSafeText className="process-code">
					{process_type.code}
				</OverflowSafeText>
				<OverflowSafeText className="process-name">
					<span style={{marginRight: '6px'}}>{process_type.name}</span>
					{process_type.is_trashed && <Pill color='gray'>Deleted</Pill> }
				</OverflowSafeText>
				<OverflowSafeText className="product-code">
				    <Tag color={category_color} style={{textAlign:"left", fontSize:'11px'}}>{category_name}</Tag>
				</OverflowSafeText>
				<OverflowSafeText tooltipText={formatAllProductCodes(product_types)} className="product-code">
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
	const path = dashboardPath(
		process_type.id,
		product_types.map(p => p.id)
	)
	return (
		<Link to={path} className={`chart ${process_type.is_trashed ? 'trashed-process' : ''}`}>
			{!process_type.is_trashed && <i className="material-icons">show_chart</i>}
		</Link>
	)
}

function formatAllProductCodes(productTypes) {
	return productTypes.map(e => e.code).join(", ")
}

function formatProductCodes(productTypes) {
	if (productTypes.length < 4) {
		return productTypes.map(p => p.code).join(', ')
	} else {
		const moreCount = productTypes.length - 2
		return `${productTypes.slice(0, 2).map(p => p.code).join(', ')} + ${moreCount} more`
	}
}