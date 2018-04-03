import React from 'react'
import Card from './Card.jsx'
import Button from './Button.jsx'
import './styles/ButtonDropdown.css'

export default class ButtonDropdown extends React.Component {
	constructor(props) {
		super(props)
		this.clickFn = this.clickFn.bind(this)
	}

	clickFn(e) {
		this.props.onToggleDropdown()
		if (!e) e = window.event;
    	e.cancelBubble = true;
   		if (e.stopPropagation) e.stopPropagation();
	}


	render() {
		let {expanded, secondary, menu} = this.props
		let className = "button-dropdown" + (expanded?" expanded":"") + (menu?" menu":"")

		return (
			<div className={className}>
				<Button secondary={secondary} onClick={this.clickFn}>{this.props.button}</Button>
				<div className="button-dropdown-shim" onClick={this.clickFn}></div>
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