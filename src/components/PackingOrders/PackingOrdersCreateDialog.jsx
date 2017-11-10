import React from 'react'
import Button from '../Card/Button'
import Dialog from '../Card/Dialog'

export default class PackingOrdersCreateDialog extends React.Component {
	render() {
		return (
			<Dialog onToggle={this.props.onToggle}>
				<h2>Create a new packing order</h2>

				<div className="button-area">
					<Button secondary onClick={this.props.onToggle}>Cancel</Button>
					<Button onClick={() => {}}>Create</Button>
				</div>
			</Dialog>
		)
	}
}