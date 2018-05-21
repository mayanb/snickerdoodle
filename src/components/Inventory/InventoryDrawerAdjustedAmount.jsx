import React from 'react'
import Input from '../Inputs/Input'
import Textarea from '../Inputs/Textarea'
import { inventoryName } from './inventoryUtils'
import { formatAmount, pluralize } from '../../utilities/stringutils'
import Button from '../Card/Button'

export default class InventoryDrawerAdjustedAmount extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			amount: '',
			explanation: '',
		}

		this.handleAmountChange = this.handleAmountChange.bind(this)
	}

	handleAmountChange(e) {
		this.setState({ amount: e.target.value })
	}

	handleExplanationChange(e) {
		this.setState({ explanation: e.target.value })
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
				<div className="form-group">
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
					</div>
				</div>
				<div className="explanation-title">Explanation of this adjustment</div>
				<Textarea
					maxLength={200}
					value={this.state.explanation}
					onChange={e => this.handleExplanationChange(e)}
				/>
				<Button
					onClick={() => onSaveAdjustment(this.state.amount, this.state.explanation)}
					disabled={this.state.amount === '' || this.state.amount < 0}
				>
					Save
				</Button>
			</div>
		)
	}
}
