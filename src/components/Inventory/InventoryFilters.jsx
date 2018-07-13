import React from 'react'
import { connect } from 'react-redux'
import * as processesActions from '../Processes/ProcessesActions.jsx'
import * as productsActions from '../Products/ProductsActions.jsx'
import { Select } from 'antd'
import { processProductFilter, formatOption } from '../../utilities/filters'
import { RM, WIP, FG, CATEGORY_NAME } from '../../utilities/constants'

class InventoryFilters extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			processTypes: [],
			productTypes: [],
			categoryTypes: [],
		}

		this.handleFilter = this.handleFilter.bind(this)
		this.handleProcessTypeChange = this.handleProcessTypeChange.bind(this)
		this.handleProductTypeChange = this.handleProductTypeChange.bind(this)
		this.handleCategoryTypeChange = this.handleCategoryTypeChange.bind(this)
	}

	componentDidMount() {
		this.props.dispatch(processesActions.fetchProcesses())
		this.props.dispatch(productsActions.fetchProducts())
	}

	render() {
		if (this.props.isFetchingData)
			return null

		return (
			<div className='inventory-filters'>
				<Select
					mode="multiple"
					allowClear
					placeholder="Filter processes"
					filterOption={processProductFilter}
					onChange={this.handleProcessTypeChange}
				>
					{this.props.processes.map(p => <Select.Option key={p.id} data={p}>
							{formatOption(p)}
						</Select.Option>
					)}
				</Select>
				<Select
					mode="multiple"
					allowClear
					placeholder="Filter products"
					filterOption={processProductFilter}
					onChange={this.handleProductTypeChange}
				>
					{this.props.products.map(p => <Select.Option key={p.id} data={p}>
							{formatOption(p)}
						</Select.Option>
					)}
				</Select>
				<Select
					mode="multiple"
					allowClear
					placeholder="Filter categories"
					filterOption={processProductFilter}
					onChange={this.handleCategoryTypeChange}
				>
					{this.props.categories.map(c => <Select.Option key={c.code} data={c}>
							{c.name}
						</Select.Option>
					)}
				</Select>
			</div>
		)

	}

	handleProcessTypeChange(newVal) {
		this.setState({ processTypes: newVal }, this.handleFilter)
	}

	handleProductTypeChange(newVal) {
		this.setState({ productTypes: newVal }, this.handleFilter)
	}

	handleCategoryTypeChange(newVal) {
		this.setState({ categoryTypes: newVal }, this.handleFilter)
	}

	handleFilter() {
		this.props.onFilter(this.state.processTypes, this.state.productTypes, this.state.categoryTypes)
	}
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
		isFetchingData: isFetchingData
	}
}

export default connect(mapStateToProps)(InventoryFilters)

