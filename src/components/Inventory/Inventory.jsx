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
			selectedProcesses: [],
			selectedProducts: [],
			selectedCategories: [],
			ordering: 'creating_task__process_type'
		}

		this.renderTableHeader = this.renderTableHeader.bind(this)

		this.handleReorder = this.handleReorder.bind(this)
		this.handleSelectRow = this.handleSelectRow.bind(this)
		this.handlePagination = this.handlePagination.bind(this)
		//this.handleFilter = this.handleFilter.bind(this)
		this.handleFilterChange = this.handleFilterChange.bind(this)
		this.fetchInventory = this.fetchInventory.bind(this)
	}

	componentDidMount() {
		this.fetchInventory()
		this.setDefaultFilters()
	}

	render() {
		let { ui } = this.props
		return (
			<div className="inventory-container">
				<ApplicationSectionHeader>Inventory</ApplicationSectionHeader>

				<div className="inventory-content">
					<div className="inventory-list-container">
						<InventoryFilters
							filters={this.getFilters()}
							onFilterChange={this.handleFilterChange}
							//onFilter={this.handleFilter}
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

	// handleFilter(processTypes, productTypes) {
	// 	this.setState({
	// 		processTypes: processTypes,
	// 		productTypes: productTypes
	// 	}, this.fetchInventory)
	// 	this.props.dispatch(actions.resetPageInventory())
	// }

	handleFilterChange(filters) {
		this.getInventory(filters)
		const qs = new URLSearchParams(this.props.location.search)
		qs.set('selectedProcesses', filters.selectedProcesses.join(','))
		qs.set('selectedProducts', filters.selectedProducts.join(','))
		//qs.set('selectedCategories', filters.selectedCategories.join(','))
		qs.set('aggregateProcesses', String(filters.aggregateProcesses))
		this.props.history.push({ search: qs.toString() })
	}

	setDefaultFilters() {
		const qsFilters = this.getFilters()
		const filters = {
			selectedProcesses: qsFilters.selectedProcesses,
			selectedProducts: qsFilters.selectedProducts,
			//selectedCategories: qsFilters.selectedCategories,
			aggregateProcesses: qsFilters === 'true' || false,
		}
		this.handleFilterChange(filters)
	}

	fetchInventory() {
		this.getInventory(this.getFilters())
		// const { processTypes, productTypes, ordering } = this.state
		// this.props.dispatch(actions.fetchInitialInventory(processTypes, productTypes, ordering))
	}

	getInventory(filters) {
		const params = { ordering: this.state.ordering }
		if (filters.selectedProcesses.length) {
			params.process_types = filters.selectedProcesses.join(',')
		}
		if (filters.selectedProducts.length) {
			params.product_types = filters.selectedProducts.join(',')
		}
		// if (filters.selectedCategories.length) {
		// 	params.category_types = filters.selectedCategories.join(',')
		// }
		if (filters.aggregateProcesses) {
			params.aggregate_processes = 'true'
		}

		this.props.dispatch(actions.fetchInventory(params))
	}

	getFilters() {
		//console.log('---- Inventory.getFilters', this.props)
		const qs = new URLSearchParams(this.props.location.search)
		return {
			selectedProcesses: qs.get('selectedProcesses') ? qs.get('selectedProcesses').split(',') : [],
			selectedProducts: qs.get('selectedProducts') ? qs.get('selectedProducts').split(',') : [],
			//selectedCategories: qs.get('selectedCategories') ? qs.get('selectedCategories').split(',') : [],
			aggregateProcesses: qs.get('aggregateProcesses') === 'true',
		}
	}
}

const mapStateToProps = (state/*, props*/) => {
	return {
		data: state.inventory.data,
		ui: state.inventory.ui,
	}
}

export default connect(mapStateToProps)(Inventory)
