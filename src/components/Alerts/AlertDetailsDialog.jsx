import React from 'react'
import Dialog from '../Card/Dialog'
import Button from '../Card/Button'
import './styles/alertdetailsdialog.css'

export default class AlertDetailsDialog extends React.Component {
	render() {

		return (
			<Dialog onToggle={this.props.onToggle} className="alert-details-dialog">
				<h2>{this.props.title}</h2>
				<div>{this.props.details}</div>
				{this.renderButtons()}
			</Dialog>
		)
	}

	renderButtons() {
		return (
			<div className="create-process-buttons">
				<Button onClick={this.props.onToggle}>Ok</Button>
			</div>
		)
	}
}


