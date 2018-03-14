import React from 'react'
import { connect } from 'react-redux'
import ApplicationSectionHeader from '../Application/ApplicationSectionHeader'
import * as actions from './InventoryActions'
import InventoryDrawer from './InventoryDrawer'
import PaginatedTable from '../PaginatedTable/PaginatedTable'
import InventoryFilters from './InventoryFilters'
import InventoryListRow from './InventoryListRow'
import Loading from '../Loading/Loading'
import './styles/inventory.css'

export class Inventory extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			processType: null,
			productType: null
		}

		this.handleSelectRow = this.handleSelectRow.bind(this)
		this.handlePagination = this.handlePagination.bind(this)
		this.handleFilter = this.handleFilter.bind(this)
		this.fetchInventory = this.fetchInventory.bind(this)
	}

	componentDidMount() {
		this.fetchInventory()
	}

	fetchInventory() {
		this.props.dispatch(actions.fetchInitialInventory(this.state.processType, this.state.productType))
		this.props.dispatch(actions.resetPageInventory())
	}



	render() {
		let { ui } = this.props
		return (
			<div className="inventory2-container">
				<ApplicationSectionHeader>Inventory</ApplicationSectionHeader>

				<InventoryFilters
					onFilter={this.handleFilter}
				/>
				<div className="inventory2-content">
					<div className="inventory-list-container">
						<Loading isFetchingData={ui.isFetchingData}>
							<PaginatedTable
								ui={this.props.ui}
								data={this.props.data}
								onClick={this.handleSelectRow}
								onPagination={this.handlePagination}
								Row={InventoryListRow}
							/>
						</Loading>
					</div>
					<InventoryDrawer />
				</div>

			</div>
		)
	}

	handleSelectRow(i) {
		this.props.dispatch(actions.selectInventory(i))
	}

	handlePagination(direction) {
		let { ui, dispatch } = this.props
		if (direction === 1 && ui.more) {
			dispatch(actions.fetchMoreInventory(ui.more))
		}
		dispatch(actions.pageInventory(direction))
	}

	handleFilter(processType, productType) {
		this.setState({
			processType: processType,
			productType: productType
		}, this.fetchInventory)
	}
}

const mapStateToProps = (state/*, props*/) => {
	return {
		data: state.inventory2.data,
		ui: state.inventory2.ui,
	}
}

export default connect(mapStateToProps)(Inventory)
