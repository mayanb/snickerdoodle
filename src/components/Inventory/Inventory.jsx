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
			selectedTags: [],
			aggregateProducts: false,
			ordering: 'creating_task__process_type'
		}

		this.renderTableHeader = this.renderTableHeader.bind(this)

		this.handleReorder = this.handleReorder.bind(this)
		this.handleSelectRow = this.handleSelectRow.bind(this)
		this.handlePagination = this.handlePagination.bind(this)
		this.handleFilterChange = this.handleFilterChange.bind(this)
		this.fetchInventory = this.fetchInventory.bind(this)
	}

	componentDidMount() {
		this.setDefaultFilters()
	}

	render() {
		let { ui } = this.props
		const filters = this.getFilters()
		return (
			<div className="inventory-container">
				<ApplicationSectionHeader>Inventory</ApplicationSectionHeader>

				<div className="inventory-content">
					<div className="inventory-list-container">
						<InventoryFilters
							filters={filters}
							data={this.props.data}
							aggregateData={this.props.aggregateData}
							onFilterChange={this.handleFilterChange}
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
					<InventoryDrawer 
						filters={filters} 
						ordering={this.state.ordering}
					/>
				</div>

			</div>
		)
	}

	renderTableHeader() {
		const columns = [
			{ title: null, className: 'inv-icon', field: null },
			{ title: 'Inventory Unit', className: 'inv-title', field: null },
			{ title: 'Category', className: 'inv-category', field: null },
			{ title: 'Code', className: 'inv-code', field: null },
			{ title: 'Amount', className: 'inv-amount', field: null },
			{ title: 'Dollar value', className: 'inv-cost', field: null },
		]
		return (
			<ObjectListHeader columns={columns} onReorder={this.handleReorder} ordering={this.state.ordering} />
		)
	}

	handleReorder(ordering) {
		this.setState({ordering: ordering}, this.fetchInventory)
	}

	handleSelectRow(i) {
		if (!this.state.aggregateProducts) {
			this.props.dispatch(actions.selectInventory(i))
		}
	}

	handlePagination(direction) {
		let { ui, dispatch } = this.props
		if (direction === 1 && ui.more) {
			dispatch(actions.fetchMoreInventory(ui.more))
		}
		dispatch(actions.pageInventory(direction))
	}

	handleFilterChange(filters) {
		this.setState(filters)
		this.getInventory(filters)
		const qs = new URLSearchParams(this.props.location.search)
		qs.set('selectedProcesses', filters.selectedProcesses.join(','))
		qs.set('selectedProducts', filters.selectedProducts.join(','))
		qs.set('selectedCategories', filters.selectedCategories.join(','))
		qs.set('selectedTags', filters.selectedTags.join(','))
		qs.set('aggregateProducts', String(filters.aggregateProducts))
		this.props.history.push({ search: qs.toString() })
	}

	setDefaultFilters() {
		this.handleFilterChange(this.getFilters())
	}

	fetchInventory() {
		this.getInventory(this.getFilters())
	}

	getInventory(filters) {
		const params = { ordering: this.state.ordering }
		if (filters.selectedProcesses.length) {
			params.process_types = filters.selectedProcesses.join(',')
		}
		if (filters.selectedProducts.length) {
			params.product_types = filters.selectedProducts.join(',')
		}
		if (filters.selectedCategories.length) {
			params.category_types = filters.selectedCategories.join(',')
		}
		if (filters.selectedTags.length) {
			params.tags = filters.selectedTags.join(',')
		}
		if (filters.aggregateProducts) {
			params.aggregate_products = 'true'
		}

		this.props.dispatch(actions.fetchInventory(params))
		this.props.dispatch(actions.fetchAggregate(params))
	}

	getFilters() {
		const qs = new URLSearchParams(this.props.location.search)
		return {
			selectedProcesses: qs.get('selectedProcesses') ? qs.get('selectedProcesses').split(',') : [],
			selectedProducts: qs.get('selectedProducts') ? qs.get('selectedProducts').split(',') : [],
			selectedCategories: qs.get('selectedCategories') ? qs.get('selectedCategories').split(',') : [],
			selectedTags: qs.get('selectedTags') ? qs.get('selectedTags').split(',') : [],
			aggregateProducts: qs.get('aggregateProducts') === 'true',
		}
	}
}

const mapStateToProps = (state/*, props*/) => {
	return {
		aggregateData: state.inventory.aggregateData,
		data: state.inventory.data,
		ui: state.inventory.ui,
	}
}

export default connect(mapStateToProps)(Inventory)
