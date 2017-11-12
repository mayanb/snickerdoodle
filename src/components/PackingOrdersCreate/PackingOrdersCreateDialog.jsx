import React from 'react'
import Button from '../Card/Button'
import Dialog from '../Card/Dialog'
import PackingOrdersCreateInventoryUnitList from './PackingOrdersCreateInventoryUnitList'

export default class PackingOrdersCreateDialog extends React.Component {
	render() {
		return (
			<Dialog onToggle={this.props.onToggle}>
				<h2>Create a new packing order</h2>
				<PackingOrdersCreateInventoryUnitList />

				<div className="button-area">
					<Button secondary onClick={this.props.onToggle}>Cancel</Button>
					<Button onClick={() => {}}>Create</Button>
				</div>
			</Dialog>
		)
	}
}