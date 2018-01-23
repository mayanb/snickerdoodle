import React from 'react'
import './styles/objectlisttitle.css'
import ButtonDropdown from '../Card/ButtonDropdown.jsx'

export default class ObjectListTitle extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			expanded: false
		}

		this.handleDropdownToggle = this.handleDropdownToggle.bind(this)
	}

	render() {
		let {title, buttonText, renderDialog } = this.props
		return (
			<div className="object-list-title">
				<div>{title}</div>
				<ButtonDropdown button={buttonText} expanded={this.state.expanded} onToggleDropdown={this.handleDropdownToggle}>
					{this.props.children}
				</ButtonDropdown>
			</div>
		)
	}

	handleDropdownToggle() {
		this.setState({expanded: !this.state.expanded})
	}
}
