import React from 'react'

export default class PackingOrdersCreateInventoryUnitAdd extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div className="packingorders-create-inventory-unit">
				<div className="inventory-unit-title">
					<span>{getTitle(props.inventoryUnit)}</span>
				</div>
				<div className="inventory-unit-amount">
					<span>{props.inventoryUnit.amount}</span>
				</div>
				<div className="inventory-unit-remove">
					<span onClick={props.onRemove}><i className="material-icons">close</i></span>
				</div>
			</div>
		)
	}

}