import React from 'react'
import { connect } from 'react-redux'
import * as processesActions from '../Processes/ProcessesActions.jsx'
import * as productsActions from '../Products/ProductsActions.jsx'
import { Select } from 'antd'
import Spinner from 'react-spinkit'
import Checkbox from '../Inputs/Checkbox'
import './styles/inventoryfilters.css'
import { formatCost } from './inventoryUtils'
import { processProductFilter, formatOption } from '../../utilities/filters'
import { RM, WIP, FG, CATEGORY_NAME } from '../../utilities/constants'

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
					<AggregateCategoryBoxes data={aggregateData} isFetchingData={isFetchingAggregateData}/>
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

function AggregateCategoryBoxes({ data, isFetchingData }) {
	const processed = processData(data)
	
	return (
		<div className='category-boxes-container'>
			<div className="category-box">
				<div className='category-box-title'>{CATEGORY_NAME['rm']}</div>
				<div className='category-box-cost'>
					{ !isFetchingData && formatCost(processed['rm'])}
					{ isFetchingData && <Spinner fadeIn="quarter" name="wave" color="grey" />}
				</div>
			</div>
			<div className="category-box">
				<div className='category-box-title'>{CATEGORY_NAME['wip']}</div>
				<div className='category-box-cost'>
					{ !isFetchingData && formatCost(processed['wip'])}
					{ isFetchingData && <Spinner fadeIn="quarter" name="wave" color="grey" />}
				</div>
			</div>
			<div className="category-box">
				<div className='category-box-title'>{CATEGORY_NAME['fg']}</div>
				<div className='category-box-cost'>
					{ !isFetchingData && formatCost(processed['fg'])}
					{ isFetchingData && <Spinner fadeIn="quarter" name="wave" color="grey" />}
				</div>
			</div>
		</div>
	)
}

function processData(data) {
	const processed = { 'rm': 0, 'wip': 0, 'fg': 0 }
	if (data) {
		data.forEach(dataItem => {
			const { category, adjusted_cost } = dataItem
			processed[category] += adjusted_cost
		})
	}
	return processed
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

