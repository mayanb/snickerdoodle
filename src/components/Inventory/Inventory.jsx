import React from 'react'
import { connect } from 'react-redux'
import ApplicationSectionHeader from '../Application/ApplicationSectionHeader'
import * as actions from './InventoryActions'
import InventoryDrawer from './InventoryDrawer'
import PaginatedTable from '../PaginatedTable/PaginatedTable'
import InventoryFilters from './InventoryFilters'
import InventoryListRow from './InventoryListRow'
import ObjectList from '../ObjectList/ObjectList'
import ObjectListHeader from '../ObjectList/ObjectListHeader'
import Loading from '../Loading/Loading'
import './styles/inventory.css'

export class Inventory extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			processTypes: [],
			productTypes: [],
			ordering: 'creating_task__process_type'
		}

		this.renderTableHeader = this.renderTableHeader.bind(this)

		this.handleReorder = this.handleReorder.bind(this)
		this.handleSelectRow = this.handleSelectRow.bind(this)
		this.handlePagination = this.handlePagination.bind(this)
		this.handleFilter = this.handleFilter.bind(this)
		this.fetchInventory = this.fetchInventory.bind(this)
	}

	componentDidMount() {
		this.fetchInventory()
	}

	fetchInventory() {
		const { processTypes, productTypes, ordering } = this.state
		this.props.dispatch(actions.fetchInitialInventory(processTypes, productTypes, ordering))
	}



	render() {
		let { ui } = this.props
		return (
			<div className="inventory-container">
				<ApplicationSectionHeader>Inventory</ApplicationSectionHeader>

				<div className="inventory-content">
					<div className="inventory-list-container">
						<InventoryFilters
							onFilter={this.handleFilter}
						/>
						<Loading isFetchingData={ui.isFetchingData}>
							<ObjectList>
								<PaginatedTable
									ui={this.props.ui}
									data={this.props.data}
									TitleRow={this.renderTableHeader}
									onClick={this.handleSelectRow}
									onPagination={this.handlePagination}
									Row={InventoryListRow}
								/>
							</ObjectList>
						</Loading>
					</div>
					<InventoryDrawer />
				</div>

			</div>
		)
	}

	renderTableHeader() {
		const columns = [
			{ title: null, className: 'inv-icon', field: null },
			{ title: 'Inventory Unit', className: 'inv-title', field: null },
			{ title: 'Code', className: 'inv-code', field: null },
			{ title: 'Amount', className: 'inv-amount', field: null },
		]
		return (
			<ObjectListHeader columns={columns} onReorder={this.handleReorder} ordering={this.state.ordering} />
		)
	}

	handleReorder(ordering) {
		this.setState({ordering: ordering}, this.fetchInventory)
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

	handleFilter(processTypes, productTypes) {
		this.setState({
			processTypes: processTypes,
			productTypes: productTypes
		}, this.fetchInventory)
		this.props.dispatch(actions.resetPageInventory())
	}
}

const mapStateToProps = (state/*, props*/) => {
	return {
		data: state.inventory.data,
		ui: state.inventory.ui,
	}
}

export default connect(mapStateToProps)(Inventory)
