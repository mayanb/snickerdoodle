import React from 'react'
import { connect } from "react-redux"
import Datepicker from '../Datepicker/Datepicker.jsx'
import Select from '../Inputs/Select'
import Input from '../Inputs/Input'
import Checkbox from '../Inputs/Checkbox'
import Button from '../Button/Button'
import * as processesActions from '../Processes/ProcessesActions.jsx'
import * as productsActions from '../Products/ProductsActions.jsx'
import './styles/activityfilters.css'

class ActivityFilters extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			isDownloading: false
		}

		this.handleDatesChange = this.handleDatesChange.bind(this)
		this.handleKeywordsChange = this.handleKeywordsChange.bind(this)
		this.handleProcessTypesChange = this.handleProcessTypesChange.bind(this)
		this.handleProductTypesChange = this.handleProductTypesChange.bind(this)
		this.handleFlaggedOnlyChange = this.handleFlaggedOnlyChange.bind(this)
		this.handleAggregateProductsChange = this.handleAggregateProductsChange.bind(this)
		this.handleDownload = this.handleDownload.bind(this)
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

	handleDownload() {
		this.setState({ isDownloading: true })
		this.props.onDownload().finally(() => this.setState({ isDownloading: false }))
	}

	render() {
		const { filters, downloadDisabled, processes, products } = this.props
		return (
			<div className="activity-filters">
				<div className="row">
					<Datepicker initialDates={filters.dates} onChange={this.handleDatesChange} />
					<div className="select-container">
						<i className="material-icons">search</i>
						<Select
							openOnFocus
							multi={true}
							value={filters.processTypes}
							options={processes}
							labelKey={'name'}
							valueKey={'id'}
							placeholder="Filter processes"
							onChange={this.handleProcessTypesChange}
						/>
					</div>
					<div className="select-container">
						<i className="material-icons">search</i>
						<Select
							openOnFocus
							multi={true}
							value={filters.productTypes}
							options={products}
							labelKey={'name'}
							valueKey={'id'}
							placeholder="Filter products"
							onChange={this.handleProductTypesChange}
						/>
					</div>
				</div>
				<div className="row">
					<div className="input-container">
						<i className="material-icons">search</i>
						<Input
							placeholder="Keywords"
							value={filters.keywords}
							onChange={this.handleKeywordsChange}
						/>
					</div>
					<div className="checkboxes">
						<Checkbox
							label="Flagged Only"
							checked={filters.flaggedOnly}
							onChange={this.handleFlaggedOnlyChange}
						/>
						<Checkbox
							label="Aggregate across product types"
							checked={filters.aggregateProducts}
							onChange={this.handleAggregateProductsChange}
						/>
					</div>
					<Button className="download"
					        onClick={this.handleDownload}
					        isLoading={this.state.isDownloading}
					        disabled={downloadDisabled}
					>
						Download All
					</Button>
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
