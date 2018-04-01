import React from 'react'
import ObjectListItem from '../ObjectList/ObjectListItem'
import moment from 'moment'
import {icon} from '../Task/TaskHelpers.jsx'
import './styles/processlistitem.css'
import {pluralize} from '../../utilities/stringutils'
import ButtonDropdown from '../Card/ButtonDropdown'
import ButtonStopClickPropagate from '../Card/ButtonStopClickPropagate'
// import {Link} from 'react-router-dom'

export default class ProcessesListItem extends React.Component {

	constructor(props) {
		super(props)
		this.state = {expanded: false}
		this.handleDropdownToggle = this.handleDropdownToggle.bind(this)
		this.handleArchive = this.handleArchive.bind(this)
		this.handleDuplicate = this.handleDuplicate.bind(this)
	}

	getClassNames() {
		return "process-list-item"
			+ (this.props.isSelected ? " process-selected" : "")
			+ (this.props.header ? " process-list-header" : "")
	}

	handleDropdownToggle() {
		this.setState({expanded: !this.state.expanded })
	}

	handleArchive() {
		this.props.onArchive()
		this.setState({ isArchiveOpen: true, expanded: !this.state.expanded })
	}

	handleDuplicate() {
		this.props.onDuplicate()
		this.setState({ isDuplicateOpen: true, expanded: !this.state.expanded })
	}

	renderOptionsButton() {
		return (
			<div className="process-options">
				...
			</div>
		)
	}

	renderProcessOptions() {
		return (
			<div className="menu-section">
				<div style={{minWidth: "100px"}}>
					<ButtonStopClickPropagate secondary onClick={this.handleDuplicate}>
						<i className="material-icons">content_copy</i>
						<span>Duplicate</span>
					</ButtonStopClickPropagate>
				</div>				
				<div style={{minWidth: "100px"}}>
					<ButtonStopClickPropagate secondary onClick={this.handleArchive}>
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
		return (
			<ObjectListItem className={this.getClassNames()} onClick={onClick}>
				<div className="icon">
					<img className="icon-img" src={icon(item.icon)} alt=""/>
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

				<div className="create-button">
					<ButtonDropdown 
			            menu
			            expanded={expanded} 
			            onToggleDropdown={this.handleDropdownToggle}
			            button={this.renderOptionsButton()}
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


