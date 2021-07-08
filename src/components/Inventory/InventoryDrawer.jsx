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
import TaskFileDropzone from '../TaskPage/TaskFileDropzone'
import './styles/inventorydrawer.css'

class InventoryDrawer extends React.Component {
	constructor(props) {
		super(props)
		this.state = { isAddingAdjustment: false }

		this.handleToggleAddAdjustment = this.handleToggleAddAdjustment.bind(this)
		this.handleSaveAdjustment = this.handleSaveAdjustment.bind(this)
		this.handleDropFiles = this.handleDropFiles.bind(this)
	}

	componentWillReceiveProps(nextProps) {
		const { process_type, product_types, teamId } = this.props.selectedInventory
		const { 
			process_type: next_process_type, 
			product_types: next_product_types,
			history: next_history,
		} = nextProps.selectedInventory
		
		if ((teamId !== nextProps.teamId) ||
			(!process_type && next_process_type) ||
			(product_types && next_product_types && (
				(product_types[0].id !== next_product_types[0].id) ||
				(!next_history)
			))
		){
			this.fetchHistory(nextProps.teamId, next_process_type.id, next_product_types[0].id)
		}
	}

	fetchHistory(teamId, processId, productId) {
		this.props.dispatch(actions.fetchInventoryHistory(teamId, processId, productId))
	}

	fetchAggregate() {
		const { filters } = this.props
		const params = { ordering: this.props.ordering }
		if (filters.selectedCategories.length) {
			params.category_types = filters.selectedCategories.join(',')
		}
		if (filters.selectedProcesses.length) {
			params.process_types = filters.selectedProcesses.join(',')
		}
		if (filters.selectedProducts.length) {
			params.product_types = filters.selectedProducts.join(',')
		}
		if (filters.aggregateProducts) {
			params.aggregate_products = 'true'
		}

		this.props.dispatch(actions.fetchAggregate(params))
	}

	render() {
		let { selectedInventory, ui, filters } = this.props
		let { process_type } = selectedInventory
		if (!process_type || filters.aggregateProducts) {
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
				<TaskFileDropzone
					onDropFiles={this.handleDropFiles}
					task={{files: []}}
					dropzoneText="Drag a CSV file of inventory changes here to submit them."
				/>
				<Loading isFetchingData={ui.isFetchingHistory || ui.isAdjusting}>
					<AdjustmentHistory history={selectedInventory.history} unit={selectedInventory.process_type.unit} />
				</Loading>
			</div>
		)
	}
	
	handleDropFiles(files) {
		const { dispatch } = this.props
		Promise.all(files.map(file => dispatch(adjustmentActions.requestUploadCsvFile(file))))
			.then(() => console.log('yay'))
	}
	
	

	handleToggleAddAdjustment() {
		this.setState({ isAddingAdjustment: !this.state.isAddingAdjustment })
	}

	handleSaveAdjustment(amount, explanation) {
		this.handleToggleAddAdjustment()
		this.props.dispatch(adjustmentActions.requestCreateAdjustment(
			this.props.userProfileId,
			this.props.selectedInventory.process_type.id,
			this.props.selectedInventory.product_types[0].id,
			amount,
			explanation
		)).then(() => {
			this.fetchHistory(this.props.teamId, this.props.selectedInventory.process_type.id, this.props.selectedInventory.product_types[0].id)
			this.fetchAggregate()
		}).catch(() => {

		})
	}
}

const mapStateToProps = (state/*, props*/) => {
	let data = state.inventory.data
	let ui = state.inventory.ui
	let teamId = ui.activeUser && state.users.data[ui.activeUser] && state.users.data[ui.activeUser].user.team
	let selectedInventory = data[ui.selectedItem] || {}
	return {
		userProfileId: state.users.data[state.users.ui.activeUser].user.id,
		ui: state.inventory.ui,
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
	let { adjusted_amount, process_type } = inventory
	return (
		<div className="inv-drawer-title">
			<InventoryIcon icon={process_type.icon} outerSize={36} innerSize={24} />
			<div>
				<span>{inventoryName(inventory)}</span>
				<div>{formatAmount(adjusted_amount, process_type.unit)}</div>
			</div>
			{showCancel && <div className="cancel" onClick={onCancel}>Cancel</div>}
		</div>
	)
}


