import React from 'react'
import { connect } from 'react-redux'
import * as processesActions from '../Processes/ProcessesActions.jsx'
import * as productsActions from '../Products/ProductsActions.jsx'
import { Select, Tooltip } from 'antd'
import Spinner from 'react-spinkit'
import Checkbox from '../Inputs/Checkbox'
import './styles/inventoryfilters.css'
import { formatCost, inventoryName } from './inventoryUtils'
import { processProductFilter, formatOption } from '../../utilities/filters'
import { RM, WIP, FG, CATEGORY_NAME, CATEGORY_COLOR } from '../../utilities/constants'

class InventoryFilters extends React.Component {
	constructor(props) {
		super(props)

		this.handleProcessTypeChange = this.handleProcessTypeChange.bind(this)
		this.handleProductTypeChange = this.handleProductTypeChange.bind(this)
		this.handleCategoryTypeChange = this.handleCategoryTypeChange.bind(this)
		this.handleAggregateProductsChange = this.handleAggregateProductsChange.bind(this)
	}

	componentDidMount() {
		this.props.dispatch(processesActions.fetchProcesses())
		this.props.dispatch(productsActions.fetchProducts())
	}

	render() {
		const { filters, products, processes, isFetchingAggregateData, aggregateData } = this.props
		const categories = [
			{ name: CATEGORY_NAME[RM], code: RM },
			{ name: CATEGORY_NAME[WIP], code: WIP },
			{ name: CATEGORY_NAME[FG], code: FG },
		]
		if (this.props.isFetchingData)
			return null

		return (
			<div className='inventory-filters'>
				<div className='row'>
					{processes.length > 0 && <Select
						mode="multiple"
						value={filters.selectedProcesses}
						allowClear
						placeholder="Filter processes"
						filterOption={processProductFilter}
						onChange={this.handleProcessTypeChange}
					>
						{processes.map(p => <Select.Option key={p.id} data={p}>
								{formatOption(p)}
							</Select.Option>
						)}
					</Select>}
					{products.length > 0 && <Select
						mode="multiple"
						value={filters.selectedProducts}
						allowClear
						placeholder="Filter products"
						filterOption={processProductFilter}
						onChange={this.handleProductTypeChange}
					>
						{products.map(p => <Select.Option key={p.id} data={p}>
								{formatOption(p)}
							</Select.Option>
						)}
					</Select>}
					{categories.length > 0 && <Select
						mode="multiple"
						value={filters.selectedCategories}
						allowClear
						placeholder="Filter categories"
						filterOption={processProductFilter}
						onChange={this.handleCategoryTypeChange}
					>
						{categories.map(c => <Select.Option key={c.code} data={c}>
								{c.name}
							</Select.Option>
						)}
					</Select>}
				</div>
				<div className='row'>
					<div className="checkboxes">
						<Checkbox
							label="Aggregate across product types"
							checked={filters.aggregateProducts}
							onChange={this.handleAggregateProductsChange}
						/>
					</div>
				</div>
				<div className='row'>
					<AggregateCostBar data={aggregateData} filters={filters} isFetchingData={isFetchingAggregateData}/>
				</div>
			</div>
		)

	}

	handleProcessTypeChange(selectedProcesses) {
		this.props.onFilterChange({ ...this.props.filters, selectedProcesses })
	}

	handleProductTypeChange(selectedProducts) {
		this.props.onFilterChange({ ...this.props.filters, selectedProducts })
	}

	handleCategoryTypeChange(selectedCategories) {
		this.props.onFilterChange({ ...this.props.filters, selectedCategories })
	}

	handleAggregateProductsChange(event) {
		const isChecked = event.target.checked
		this.props.onFilterChange({ ...this.props.filters, aggregateProducts: isChecked })
	}
}

function AggregateCostBar({ data, filters, isFetchingData })  {
	const processed = processData(data, filters)

	return (
		<div className='aggregate-cost-bar'>
			{ !isFetchingData && data && processed.map((item, i) => {
				const itemColor = CATEGORY_COLOR[item.category]
				const itemStyle = {
					flex: item.adjusted_cost,
					backgroundColor: itemColor,
				}
				let item_type = ''
				if ('process_types' in item) {
					item_type = CATEGORY_NAME[item.category]
				} else if (item.product_types.length > 1) {
					item_type = item.process_type.name
				} else {
					item_type = inventoryName(item)
				}
				return item.adjusted_cost > 0 ? (
					<Tooltip title={`${item_type} ${formatCost(item.adjusted_cost)}`} key={i}>
						<div style={itemStyle} className="cost-item"></div>
					</Tooltip>
				) : null
			})}
			{ isFetchingData &&
				<div className='spinner-container'>
					<Spinner fadeIn="quarter" name={"ball-beat"} />
				</div>
			}
		</div>
	)
}

function processData(data, filters) {
	if (data && noFilters(filters)) {
		let lastCategory = null
		let itemToAdd = {}
		let processed = []
		data.forEach(item => {
			if (lastCategory !== item.category) {
				if (lastCategory !== null) {
					processed.push(itemToAdd)
				}
				lastCategory = item.category
				itemToAdd = {
					category: item.category,
					adjusted_cost: 0,
					process_types: []
				}
			}
			itemToAdd.adjusted_cost += item.adjusted_cost
			itemToAdd.process_types.push({
				process_type: item.process_type,
				product_types: item.product_types
			})
		})
		processed.push(itemToAdd)
		return processed
	}
	return data
}

function noFilters(filters) {
	const { selectedCategories, selectedProcesses, selectedProducts } = filters
	return selectedCategories.length === 0 && selectedProcesses.length === 0 && selectedProducts.length === 0
}

const mapStateToProps = (state/*, props*/) => {
	const isFetchingData = state.processes.ui.isFetchingData || state.products.ui.isFetchingData
	const categories = [
		{ name: CATEGORY_NAME[RM], code: RM },
		{ name: CATEGORY_NAME[WIP], code: WIP },
		{ name: CATEGORY_NAME[FG], code: FG },
	]
	return {
		processes: state.processes.data,
		products: state.products.data,
		categories,
		isFetchingData: isFetchingData,
		isFetchingAggregateData: state.inventory.ui.isFetchingAggregateData
	}
}

export default connect(mapStateToProps)(InventoryFilters)

