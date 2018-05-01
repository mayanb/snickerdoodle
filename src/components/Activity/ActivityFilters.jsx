import React from 'react'
import {connect} from "react-redux"
import Datepicker from '../Datepicker/Datepicker.jsx'
import Select from '../Inputs/Select'
import { pluralize } from "../../utilities/stringutils"
import * as processesActions from '../Processes/ProcessesActions.jsx'
import * as productsActions from '../Products/ProductsActions.jsx'
import './styles/activityfilters.css'

class ActivityFilters extends React.Component {
	constructor(props) {
		super(props)
		this.handleDateChange = this.handleDateChange.bind(this)
	}

	componentDidMount() {
		this.props.dispatch(processesActions.fetchProcesses())
		this.props.dispatch(productsActions.fetchProducts())
	}

	handleDateChange(dates) {
		const newFilters = { ...this.props.filters, dates: dates }
		this.props.onFilterChange(newFilters)
	}

	render() {
		const { filters } = this.props
		return (
			<div className="activity-filters">
				<Datepicker initialDates={filters.dates} onChange={this.handleDateChange} />
				<Select
					openOnFocus
					clearable={false}
					value={filters.processType}
					options={this.props.processes}
					optionRenderer={(opt) => `${opt.name} (${pluralize(2, opt.unit)})`}
					valueRenderer={(opt) => `${opt.name} (${pluralize(2, opt.unit)})`}
					valueKey={'id'}
					placeholder="Select a process type"
					onChange={(newVal) => newVal}
				/>
				<Select
					openOnFocus
					multi={true}
					value={filters.productTypes}
					options={this.props.products}
					labelKey={'name'}
					valueKey={'id'}
					placeholder="All product types"
					onChange={(newVal) => newVal}
				/>
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
