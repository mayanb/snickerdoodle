import React from 'react'
import {connect} from "react-redux"
import Datepicker from '../Datepicker/Datepicker.jsx'
import Select from '../Inputs/Select'
import Input from '../Inputs/Input'
import * as processesActions from '../Processes/ProcessesActions.jsx'
import * as productsActions from '../Products/ProductsActions.jsx'
import './styles/activityfilters.css'

class ActivityFilters extends React.Component {
	constructor(props) {
		super(props)
		this.handleDatesChange = this.handleDatesChange.bind(this)
		this.handleKeywordsChange = this.handleKeywordsChange.bind(this)
		this.handleProcessTypesChange = this.handleProcessTypesChange.bind(this)
		this.handleProductTypesChange = this.handleProductTypesChange.bind(this)
		this.handleFlaggedOnlyChange = this.handleFlaggedOnlyChange.bind(this)
		this.handleAggregateProductsChange = this.handleAggregateProductsChange.bind(this)
	}

	componentDidMount() {
		this.props.dispatch(processesActions.fetchProcesses())
		this.props.dispatch(productsActions.fetchProducts())
	}

	handleDatesChange(dates) {
		this.props.onFilterChange({ ...this.props.filters, dates: dates })
	}

	handleKeywordsChange(event) {
		this.props.onFilterChange({ ...this.props.filters, keywords: event.target.value })
	}

	handleProcessTypesChange(processTypes) {
		this.props.onFilterChange({ ...this.props.filters, processTypes: processTypes })
	}

	handleProductTypesChange(productTypes) {
		this.props.onFilterChange({ ...this.props.filters, productTypes: productTypes })
	}

	handleFlaggedOnlyChange(event) {
		const isChecked = event.target.checked
		this.props.onFilterChange({ ...this.props.filters, flaggedOnly: isChecked })
	}

	handleAggregateProductsChange(event) {
		const isChecked = event.target.checked
		this.props.onFilterChange({ ...this.props.filters, aggregateProducts: isChecked })
	}

	render() {
		const { filters } = this.props
		return (
			<div className="activity-filters">
				<Datepicker initialDates={filters.dates} onChange={this.handleDatesChange} />
				<Select
					openOnFocus
					multi={true}
					value={filters.processTypes}
					options={this.props.processes}
					labelKey={'name'}
					valueKey={'id'}
					placeholder="Select a process type"
					onChange={this.handleProcessTypesChange}
				/>
				<Select
					openOnFocus
					multi={true}
					value={filters.productTypes}
					options={this.props.products}
					labelKey={'name'}
					valueKey={'id'}
					placeholder="All product types"
					onChange={this.handleProductTypesChange}
				/>
				<Input
					placeholder="Keywords"
					prefix={<i className="material-icons element-filter-icon">search</i>}
					value={filters.keywords}
					onChange={this.handleKeywordsChange}
				/>
				<div className="checkbox-container">
					<input type="checkbox" checked={filters.flaggedOnly} onClick={this.handleFlaggedOnlyChange}/>
					Flagged Only
				</div>
				<div className="checkbox-container" onClick={this.handleAggregateProductsChange}>
					<input type="checkbox" checked={filters.aggregateProducts}/>
					Aggregate across product types
				</div>
			</div>
		)
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


export default connect(mapStateToProps)(ActivityFilters)
