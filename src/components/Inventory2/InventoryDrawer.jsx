import React from 'react'
import { connect } from 'react-redux'
import InventoryIcon from './InventoryIcon'
import InventoryDrawerAdjustedAmount from './InventoryDrawerAdjustedAmount'
import AdjustmentHistory from './AdjustmentHistory'
import * as actions from './InventoryActions'
import * as adjustmentActions from './AdjustmentActions'
import { formatAmount } from '../../utilities/stringutils'
import { inventoryName } from './inventoryUtils'
import Loading from '../Loading/Loading'
import './styles/inventorydrawer.css'

class InventoryDrawer extends React.Component {
	constructor(props) {
		super(props)
		this.state = { isAddingAdjustment: false }

		this.handleToggleAddAdjustment = this.handleToggleAddAdjustment.bind(this)
		this.handleSaveAdjustment = this.handleSaveAdjustment.bind(this)
	}

	componentWillReceiveProps(nextProps) {
		if (this.props.teamId !== nextProps.teamId ||
			this.props.selectedInventory.process_id !== nextProps.selectedInventory.process_id ||
			this.props.selectedInventory.product_id !== nextProps.selectedInventory.product_id) {
			this.fetchHistory(nextProps.teamId, nextProps.selectedInventory.process_id, nextProps.selectedInventory.product_id)
		}
	}

	fetchHistory(teamId, processId, productId) {
		this.props.dispatch(actions.fetchInventoryHistory(teamId, processId, productId))
	}

	render() {
		let { selectedInventory, ui } = this.props

		if (!selectedInventory.process_id) {
			return null
		}

		return (
			<div className="inventory-drawer">
				<DrawerTitle inventory={selectedInventory}
				             showCancel={this.state.isAddingAdjustment}
				             onCancel={this.handleToggleAddAdjustment}
				/>
				{this.state.isAddingAdjustment ?
					<InventoryDrawerAdjustedAmount inventory={selectedInventory} onSaveAdjustment={this.handleSaveAdjustment} /> :
					<AddAdjustment onClick={this.handleToggleAddAdjustment} />
				}
				<Loading isFetchingData={ui.isFetchingHistory || ui.isAdjusting}>
					<AdjustmentHistory history={selectedInventory.history} unit={selectedInventory.process_unit} />
				</Loading>
			</div>
		)
	}

	handleToggleAddAdjustment() {
		this.setState({ isAddingAdjustment: !this.state.isAddingAdjustment })
	}

	handleSaveAdjustment(amount, explanation) {
		this.handleToggleAddAdjustment()
		this.props.dispatch(adjustmentActions.requestCreateAdjustment(
			this.props.userProfileId,
			this.props.selectedInventory.process_id,
			this.props.selectedInventory.product_id,
			amount,
			explanation
		))
			.then(() => {
				this.fetchHistory(this.props.teamId, this.props.selectedInventory.process_id, this.props.selectedInventory.product_id)
			})
			.catch(() => {

			})
	}
}

const mapStateToProps = (state/*, props*/) => {
	let data = state.inventory2.data
	let ui = state.inventory2.ui
	let teamId = ui.activeUser && state.users.data[ui.activeUser] && state.users.data[ui.activeUser].user.team
	let selectedInventory = data[ui.selectedItem] || {}
	return {
		userProfileId: state.users.data[state.users.ui.activeUser].user.id,
		ui: state.inventory2.ui,
		teamId: teamId,
		selectedInventory: selectedInventory,
	}
}

export default connect(mapStateToProps)(InventoryDrawer)

function AddAdjustment({ onClick }) {
	return (
		<div className="add-adjustment" onClick={onClick}>
			I need to update my stock count
		</div>
	)
}

function DrawerTitle({ inventory, showCancel, onCancel }) {
	let { adjusted_amount, process_unit } = inventory
	return (
		<div className="inv-drawer-title">
			<InventoryIcon icon={inventory.process_icon} outerSize={36} innerSize={24} />
			<div>
				<span>{inventoryName(inventory)}</span>
				<div>{formatAmount(adjusted_amount, process_unit)}</div>
			</div>
			{showCancel && <div className="cancel" onClick={onCancel}>Cancel</div>}
		</div>
	)
}


