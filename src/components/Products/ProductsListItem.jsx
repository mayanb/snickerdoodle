import React from 'react'
import Icon from '../Card/Icon'
import moment from 'moment'
import ObjectListItem from '../ObjectList/ObjectListItem'
import ButtonDropdown from '../Card/ButtonDropdown'
import ButtonStopClickPropagate from '../Card/ButtonStopClickPropagate'

export default class ProductsListItem extends React.Component {
	constructor(props) {
		super(props)
		this.state = {expanded: false}
		this.handleDropdownToggle = this.handleDropdownToggle.bind(this)
	}

	getClassNames() {
		return "products-list-item" 
			+ (this.props.header?" products-list-header":"")
	}

	handleDropdownToggle() {
		this.setState({expanded: !this.state.expanded })
	}

	handleDropdownOption(fn) {
		console.log('fn', fn)
		this.setState({ expanded: !this.state.expanded })
		fn(this.props.index)
	}

	renderProductOptions() {
		let { onArchive} = this.props
		return (
			<div className="menu-section">
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

		item.created_at = item.created_at || 'N/A' //Some products might not have a created_at value

		return (
			<ObjectListItem className={this.getClassNames()} onClick={onClick}>

				<div className={"code"}>
					<Icon src="" size="20px" content={item.code}/>
					{item.code}
				</div>
				<div className={"name"}>
					{item.name}
				</div>
				<div className={"owner"}>
					<Icon src="" size="20px" content={item.username}/>
					{item.username}
				</div>
				<div className={"date"}>
					{moment(item.created_at).format("MMMM DD, YYYY")}
				</div>
				<div className="more-options-button">
					<ButtonDropdown
						menu
						expanded={expanded}
						onToggleDropdown={this.handleDropdownToggle}
						button={<i className="material-icons">more_horiz</i>}
					>
						<div className="account-menu">
							{ this.renderProductOptions() }
						</div>
					</ButtonDropdown>
				</div>
			</ObjectListItem>
		)
	}

}

