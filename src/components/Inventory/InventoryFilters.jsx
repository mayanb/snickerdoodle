import React from 'react'
import { connect } from 'react-redux'
import * as processesActions from '../Processes/ProcessesActions.jsx'
import * as productsActions from '../Products/ProductsActions.jsx'
import { Select } from 'antd'
import { processProductFilter, formatOption } from '../../utilities/filters'

class InventoryFilters extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			processTypes: [],
			productTypes: []
		}

		this.handleFilter = this.handleFilter.bind(this)
		this.handleProcessTypeChange = this.handleProcessTypeChange.bind(this)
		this.handleProductTypeChange = this.handleProductTypeChange.bind(this)
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
			</div>
		)

	}

	handleProcessTypeChange(newVal) {
		this.setState({ processTypes: newVal }, this.handleFilter)
	}

	handleProductTypeChange(newVal) {
		this.setState({ productTypes: newVal }, this.handleFilter)
	}

	handleFilter() {
		this.props.onFilter(this.state.processTypes, this.state.productTypes)
	}
}

const mapStateToProps = (state/*, props*/) => {
	const isFetchingData = state.processes.ui.isFetchingData || state.products.ui.isFetchingData
	return {
		processes: state.processes.data,
		products: state.products.data,
		isFetchingData: isFetchingData
	}
}

export default connect(mapStateToProps)(InventoryFilters)
