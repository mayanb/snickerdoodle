import React from 'react'
import { pluralize, formatNumber } from '../../utilities/stringutils'
import { connect } from 'react-redux'
import * as actions from './AdjustmentActions'
import Input from '../Inputs/Input'

export default function InventoryDrawerAdjustedAmount({ inventory }) {
	let { adjusted_amount: amount, process_unit: unit } = inventory
	return (
		<div className="adjusted-amount">
			<div className="adjusted-amount-header">
				<span className="amt">{`${formatNumber(amount)} ${pluralize(amount, unit)}`}</span>
				<span className="in-stock">In stock</span>
			</div>
			<Adjuster unit={unit} />
		</div>
	)
}

class UnconnectedAdjuster extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			amount: ''
		}

		this.handleAmountChange = this.handleAmountChange.bind(this)
		this.handleSave = this.handleSave.bind(this)
	}

	handleAmountChange(e) {
		this.setState({ amount: e.target.value })
	}

	handleSave() {
		this.props.dispatch(actions.requestCreateAdjustment(
			this.props.userId,
			this.props.selectedInventory.process_id,
			this.props.selectedInventory.product_id,
			this.state.amount
		))
	}

	render() {
		let { unit } = this.props
		return (
			<div className="inv-adjuster">
				<div>What is the actual stock of this product?</div>
				<div>
					<Input
						type="number"
						value={this.state.amount}
						onChange={e => this.handleAmountChange(e)}
					/>
					<span>Discrepancy: {unit}</span>
					<button onClick={this.handleSave}>Save</button>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state/*, props*/) => {
	console.log('state', state)
	let data = state.inventory2.data
	let ui = state.inventory2.ui
	let selectedInventory = ui.selectedItem && data[ui.selectedItem]
	return {
		userId: state.users.data[state.users.ui.activeUser].user.user_id,
		selectedInventory: selectedInventory,
	}
}

const Adjuster = connect(mapStateToProps)(UnconnectedAdjuster)
