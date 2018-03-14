import React from 'react'
import { connect } from 'react-redux'
import * as processesActions from '../Processes/ProcessesActions.jsx'
import * as productsActions from '../Products/ProductsActions.jsx'
import Select from '../Inputs/Select'
import { pluralize } from "../../utilities/stringutils"

class InventoryFilters extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			processType: null,
			productType: null
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
						value={this.state.processType}
						options={this.props.processes}
						optionRenderer={(opt) => `${opt.name} (${pluralize(2, opt.unit)})`}
						valueRenderer={(opt) => `${opt.name} (${pluralize(2, opt.unit)})`}
						valueKey={'id'}
						simpleValue={true}
						placeholder="All process types"
						onChange={(newVal) => this.handleProcessTypeChange(newVal)}
					/>
					<Select
						openOnFocus
						value={this.state.productType}
						options={this.props.products}
						labelKey={'name'}
						valueKey={'id'}
						simpleValue={true}
						placeholder="All product types"
						onChange={(newVal) => this.handleProductTypeChange(newVal)}
					/>
			</div>
		)

	}

	handleProcessTypeChange(newVal) {
		this.setState({ processType: newVal }, this.handleFilter)
	}

	handleProductTypeChange(newVal) {
		this.setState({ productType: newVal }, this.handleFilter)
	}

	handleFilter() {
		this.props.onFilter(this.state.processType, this.state.productType)
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

