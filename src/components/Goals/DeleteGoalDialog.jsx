import React from 'react'
import Dialog from '../Card/Dialog'
import Button from '../Card/Button'

export default class DeleteGoalDialog extends React.Component {
	constructor(props) {
		super(props)

		this.handleRemove = this.handleRemove.bind(this)
	}

	render() {
		return (
			<Dialog onToggle={this.props.onToggle}>
				<h1>Remove goal</h1>
				<span>Are you sure you want to remove this goal?</span>
				{ this.renderRule() }
				{ this.renderButtons() }
			</Dialog>
		)
	}

	renderRule() {
		return (
			<div className="rule" style={{marginLeft: "-32px", marginRight: "-20px", width: "120%"}} />
		)
	}


	renderButtons() {
		return (
			<div className="create-process-buttons">
				<Button secondary onClick={this.props.onToggle}>Cancel</Button>
				<Button onClick={this.handleRemove}>Remove</Button>
			</div>
		)
	}

	handleRemove() {
		this.props.onToggle()
		this.props.onConfirm()
	}
}

