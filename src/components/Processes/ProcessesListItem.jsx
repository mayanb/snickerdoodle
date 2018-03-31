import React from 'react'
import ObjectListItem from '../ObjectList/ObjectListItem'
import moment from 'moment'
import {icon} from '../Task/TaskHelpers.jsx'
import './styles/processlistitem.css'
import {pluralize} from '../../utilities/stringutils'

export default class ProcessesListItem extends React.Component {
	getClassNames() {
		return "process-list-item"
			+ (this.props.isSelected ? " process-selected" : "")
			+ (this.props.header ? " process-list-header" : "")
	}


	render() {
		let { item, onClick } = this.props
		console.log(item)

		return (
			<ObjectListItem className={this.getClassNames()} onClick={onClick}>
				<div className="icon">
					<img src={icon(item.icon)} alt=""/>
				</div>

				<div className="code">
					{item.code}
				</div>

				<div className="name">
					{item.name}
				</div>

				<div className="description">
					{item.output_desc}
				</div>

				<div className="default-amount">
					{`${parseInt(item.default_amount, 10)} ${pluralize(item.default_amount, item.unit)}`}
				</div>

				<div className="last-used">
					{ item.last_used? moment(item.last_used).fromNow() : "Never" }
				</div>


				<div className="owner">
					{item.created_by_name.substr(0, item.created_by_name.indexOf('_'))}
				</div>
				<div className={"date"}>
					{moment(item.created_at).format("MMMM DD, YYYY")}
				</div>
			</ObjectListItem>
		)
	}

}

// { item.last_used? moment(item.last_used).format("MMMM DD, YYYY") : "Never" }


