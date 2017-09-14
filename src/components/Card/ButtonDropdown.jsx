import React from 'react'
import Card from './Card.jsx'
import Button from './Button.jsx'

export default class ButtonDropdown extends React.Component {
	constructor(props) {
		super(props) 
		this.state = { expanded: false }
	}

	render() {
		let {expanded} = this.state
		let className = "button-dropdown" + (expanded?" expanded":"")
		let toggleExpand = () => this.setState({expanded: !expanded})

		return (
			<div className={className}>
				<Button onClick={toggleExpand}>{this.props.button}</Button>
				<div className="button-dropdown-shim" onClick={toggleExpand}></div>
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