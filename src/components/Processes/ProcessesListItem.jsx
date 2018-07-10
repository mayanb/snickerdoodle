import React from 'react'
import ObjectListItem from '../ObjectList/ObjectListItem'
import moment from 'moment'
import { getProcessIcon } from '../../utilities/stringutils'
import {pluralize} from '../../utilities/stringutils'
import OverflowSafeText from '../OverflowSafeText/OverflowSafeText'
import ButtonDropdown from '../Card/ButtonDropdown'
import ButtonStopClickPropagate from '../Card/ButtonStopClickPropagate'
import Img from '../Img/Img'
import { Tag } from 'antd';

export default class ProcessesListItem extends React.Component {

	constructor(props) {
		super(props)
		this.state = {expanded: false}
		this.handleDropdownToggle = this.handleDropdownToggle.bind(this)
	}

	getClassNames() {
		return "process-list-item"
			+ (this.props.isSelected ? " process-selected" : "")
			+ (this.props.header ? " process-list-header" : "")
	}

	handleDropdownToggle() {
		this.setState({expanded: !this.state.expanded })
	}

	handleDropdownOption(fn) {
		this.setState({ expanded: !this.state.expanded })
		fn(this.props.index)
	}

	renderProcessOptions() {
		let { onArchive, onDuplicate } = this.props
		return (
			<div className="menu-section">
				<div style={{minWidth: "100px"}}>
					<ButtonStopClickPropagate secondary onClick={() => this.handleDropdownOption(onDuplicate)}>
						<i className="material-icons">content_copy</i>
						<span>Duplicate</span>
					</ButtonStopClickPropagate>
				</div>				
				<div style={{minWidth: "100px"}}>
					<ButtonStopClickPropagate secondary onClick={() => this.handleDropdownOption(onArchive)}>
						<i className="material-icons">delete_forever</i>
						<span>Delete</span>
					</ButtonStopClickPropagate>
				</div>
			</div>
		)
	}


	render() {
		let { item, onClick } = this.props
		let { expanded } = this.state
		let category_name = "Work in Progress"
		let category_color = "#40B3FF"
		const category = item.category
		if(category !== "wip"){
			category === 'rm' ? category_name = "Raw Material" : category_name = "Finished Goods"
			category === 'rm' ? category_color = "#F2A51F" : category_color = "#5BD069"
		}
		return (
			<ObjectListItem className={this.getClassNames()} onClick={onClick}>
				<div className="icon">
					<Img className="icon-img" src={getProcessIcon(item.icon)} />
				</div>

				<OverflowSafeText className="code">
					{item.code}
				</OverflowSafeText>

				<OverflowSafeText className="name">
					{item.name}
				</OverflowSafeText>

				<OverflowSafeText className="category">
				    <Tag color={category_color} style={{textAlign:"left", fontSize:'11px'}}>{category_name}</Tag>
				</OverflowSafeText>

				<OverflowSafeText className="default-amount">
					{`${parseInt(item.default_amount, 10)} ${pluralize(item.default_amount, item.unit)}`}
				</OverflowSafeText>

				<OverflowSafeText className="last-used">
					{ item.last_used? moment(item.last_used).fromNow() : "Never" }
				</OverflowSafeText>

				<OverflowSafeText className="owner">
					{item.created_by_name.substr(0, item.created_by_name.indexOf('_'))}
				</OverflowSafeText>

				<OverflowSafeText className={"date"}>
					{moment(item.created_at).format("MMMM DD, YYYY")}
				</OverflowSafeText>

				<div className="more-options-button">
					<ButtonDropdown 
			            menu
			            expanded={expanded} 
			            onToggleDropdown={this.handleDropdownToggle}
			            button={<i className="material-icons more_horiz">more_horiz</i>}
	          		>
		            <div className="account-menu">
		              { this.renderProcessOptions() }
		            </div>
	          		</ButtonDropdown>
				</div>
			</ObjectListItem>
		)
	}

}

// { item.last_used? moment(item.last_used).format("MMMM DD, YYYY") : "Never" }


