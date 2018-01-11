import React from 'react'
import Card from './Card.jsx'
import Button from './Button.jsx'
import './styles/ButtonDropdown.css'

export default class ButtonDropdown extends React.Component {
	constructor(props) {
		super(props) 
	}

	render() {
		let {expanded, onToggleDropdown, secondary, menu} = this.props
		let className = "button-dropdown" + (expanded?" expanded":"") + (menu?" menu":"")

		return (
			<div className={className}>
				<Button secondary={secondary} onClick={onToggleDropdown}>{this.props.button}</Button>
				<div className="button-dropdown-shim" onClick={onToggleDropdown}></div>
				{this.renderContent()}
			</div>
		)
	}

	renderContent() {
		return (
			<div className="button-dropdown-content">
				<Card>
					{ this.props.children }
				</Card>
			</div>
		)
	}
}