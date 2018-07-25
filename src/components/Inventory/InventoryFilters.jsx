import React from 'react'
import { connect } from 'react-redux'
import * as processesActions from '../Processes/ProcessesActions.jsx'
import * as productsActions from '../Products/ProductsActions.jsx'
import { Select, Tooltip } from 'antd'
import Checkbox from '../Inputs/Checkbox'
import './styles/inventoryfilters.css'
import { shortInventoryName, formatCost } from './inventoryUtils'
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
					<AggregateCostBar data={aggregateData} isFetchingData={isFetchingAggregateData}/>
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

function AggregateCostBar({ data, isFetchingData })  {
	console.log('AggregateCostBar.data', data)
	return (
		<div className='aggregate-cost-bar'>
			{!isFetchingData && data && data.map((item, i) => {
				const itemColor = CATEGORY_COLOR[item.category]
				const itemStyle = {
					flex: item.adjusted_cost,
					backgroundColor: itemColor,
				}
				const text = shortInventoryName(item) + ' ' + formatCost(item.adjusted_cost)
				return item.adjusted_cost > 0 ? (
					<Tooltip title={text} key={i}>
						<div style={itemStyle} className="cost-item"></div>
					</Tooltip>
				) : null
			})}
		</div>
	)
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

