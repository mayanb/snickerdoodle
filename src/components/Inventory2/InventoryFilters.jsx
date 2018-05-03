import React from 'react'
import { connect } from 'react-redux'
import * as processesActions from '../Processes/ProcessesActions.jsx'
import * as productsActions from '../Products/ProductsActions.jsx'
import Select from '../Inputs/Select'
import { pluralize } from "../../utilities/stringutils"
import { processProductFilter } from '../../utilities/filters'

class InventoryFilters extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			processTypes: [],
			productTypes: []
		}

		this.handleFilter = this.handleFilter.bind(this)
	}

	componentDidMount() {
		this.props.dispatch(processesActions.fetchProcesses())
		this.props.dispatch(productsActions.fetchProducts())
	}

	render() {
		if(this.props.isFetchingData)
			return null

		return (
			<div className='inventory-filters'>
					<Select
						openOnFocus
						value={this.state.processTypes}
						options={this.props.processes}
						multi={true}
						optionRenderer={(opt) => `${opt.name} (${pluralize(2, opt.unit)})`}
						valueRenderer={(opt) => `${opt.name} (${pluralize(2, opt.unit)})`}
						valueKey={'id'}
						placeholder="All process types"
						filterOption={processProductFilter}
						onChange={(newVal) => this.handleProcessTypeChange(newVal)}
					/>
					<Select
						openOnFocus
						value={this.state.productTypes}
						options={this.props.products}
						multi={true}
						labelKey={'name'}
						valueKey={'id'}
						placeholder="All product types"
						filterOption={processProductFilter}
						onChange={(newVal) => this.handleProductTypeChange(newVal)}
					/>
			</div>
		)

	}

	handleProcessTypeChange(newVal) {
		this.setState({ processTypes: newVal.map(o => o.id) }, this.handleFilter)
	}

	handleProductTypeChange(newVal) {
		this.setState({ productTypes: newVal.map(o => o.id) }, this.handleFilter)
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

