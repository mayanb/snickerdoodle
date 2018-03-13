import React from 'react'
import Input from '../Inputs/Input'
import { inventoryName } from './inventoryUtils'
import { formatAmount, pluralize } from '../../utilities/stringutils'
import Button from '../Card/Button'

export default class InventoryDrawerAdjustedAmount extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			amount: ''
		}

		this.handleAmountChange = this.handleAmountChange.bind(this)
	}

	handleAmountChange(e) {
		this.setState({ amount: e.target.value })
	}

	render() {
		const { inventory, onSaveAdjustment } = this.props
		const unit = inventory.process_unit
		let discrepancy = ''
		if (inventory.history && inventory.history.length && this.state.amount) {
			const discrepancyAmount = this.state.amount - inventory.history[0].data.endAmount
			discrepancy = `Discrepancy: ${formatAmount(discrepancyAmount, unit)}`
		}
		return (
			<div className="inv-adjuster">
				<div className="question">
					<span className="bold">What is the actual stock of</span> {inventoryName(inventory)}?
				</div>
				<div className="form">
					<div className="input-container">
						<Input
							autoFocus
							type="number"
							value={this.state.amount}
							onChange={e => this.handleAmountChange(e)}
						/>
						<span className="unit-label">{pluralize(parseInt(this.state.amount, 10), unit)}</span>
					</div>
					<div className="discrepancy">{discrepancy}</div>
					<Button
						onClick={() => onSaveAdjustment(this.state.amount)}
						disabled={this.state.amount === ''}
					>
						Save
					</Button>
				</div>
			</div>
		)
	}
}
