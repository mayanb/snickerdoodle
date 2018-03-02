import React from 'react'
import { connect } from 'react-redux'
import * as processesActions from '../Processes/ProcessesActions.jsx'
import * as productsActions from '../Products/ProductsActions.jsx'
import * as productionTrendsActions from '../ProductionTrends/ProductionTrendsActions.jsx'
import Loading from '../Loading/Loading'
import TrendsLineChart from './TrendsLineChart'
import Select from '../Inputs/Select'
import './styles/productiontrends.css'
import CumulativeAreaChart from "../CumulativeAreaChart/CumulativeAreaChart"
import Img from '../Img/Img'
import { pluralize } from "../../utilities/stringutils"

const CHART_HEIGHT = 200
const CHART_WIDTH = 900

class ProductionTrends extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			processType: null,
			productTypes: []
		}

		this.handleSearch = this.handleSearch.bind(this)

	}

	componentDidMount() {
		this.props.dispatch(processesActions.fetchProcesses())
		this.props.dispatch(productsActions.fetchProducts())
	}

	render() {

		//Set default process type
		if (this.props.processes.length && !this.state.processType) {
			const foil = this.props.processes.find(p => p.name === 'Foil')
			this.setState({ processType: foil }, this.handleSearch)
		}


		const unitLabel = this.state.processType ? pluralize(2, this.state.processType.unit) : ''

		return (
			<div className="production-trends">
				<Loading isFetchingData={this.props.isFetchingData}>
					<div className="trends-content">
						<div className="every-month-header">
							<Subtitle>
								<b>How much do you make&nbsp;</b> every month?
								<Help>Displays total production for each month</Help>
							</Subtitle>
							{this.renderOptions()}
						</div>
						<TrendsLineChart width={CHART_WIDTH} height={CHART_HEIGHT} data={this.props.recentMonths} unitLabel={unitLabel} />
						<div className="cumulatives">
							<div>
								<Subtitle>
									What did you make <b>&nbsp;this week?</b>
									<Help>Displays this week's cumulative total production for each day</Help>
								</Subtitle>
								<CumulativeAreaChart width={CHART_WIDTH/2} height={CHART_HEIGHT} data={this.props.weekToDate} unitLabel={unitLabel} labelDays={true} />
							</div>
							<div>
								<Subtitle>
									What did you make <b>&nbsp;this month?</b>
									<Help>Displays this month's cumulative total production for each day</Help>
								</Subtitle>
								<CumulativeAreaChart width={CHART_WIDTH/2} height={CHART_HEIGHT} data={this.props.monthToDate} unitLabel={unitLabel} />
							</div>
						</div>
					</div>
				</Loading>
			</div>
		)
	}

	renderOptions() {
		return (
			<div className="options">
				<Select
					openOnFocus
					clearable={false}
					value={this.state.processType}
					options={this.props.processes}
					optionRenderer={(opt) => `${opt.name} (${pluralize(2, opt.unit)})`}
					valueRenderer={(opt) => `${opt.name} (${pluralize(2, opt.unit)})`}
					valueKey={'id'}
					placeholder="Select a process type"
					onChange={(newVal) => this.handleProcessTypeChange(newVal)}
				/>
				<Select
					openOnFocus
					multi={true}
					value={this.state.productTypes}
					options={this.props.products}
					labelKey={'name'}
					valueKey={'id'}
					placeholder="All product types"
					onChange={(newVal) => this.handleProductTypeChange(newVal)}
				/>
			</div>
		)
	}

	handleSearch() {
		this.props.dispatch(productionTrendsActions.fetchRecentMonths(this.state.processType, this.state.productTypes))
		this.props.dispatch(productionTrendsActions.fetchMonthToDate(this.state.processType, this.state.productTypes))
		this.props.dispatch(productionTrendsActions.fetchWeekToDate(this.state.processType, this.state.productTypes))
	}

	handleProcessTypeChange(newVal) {
		this.setState({ processType: newVal }, this.handleSearch)
	}

	handleProductTypeChange(newVal) {
		this.setState({ productTypes: newVal }, this.handleSearch)
	}
}

function Subtitle(props) {
	return (
		<div className="trends-subtitle">{props.children}</div>
	)
}

function Help({children}) {
	return (
		<div className="help">
			<Img src="help@2x"/>
			<div className="help-tooltip">
				{children}
			</div>
		</div>
	)
}

const mapStateToProps = (state/*, props*/) => {
	const isFetchingData = state.processes.ui.isFetchingData || state.products.ui.isFetchingData
	return {
		processes: state.processes.data,
		products: state.products.data,
		recentMonths: state.productionTrends[productionTrendsActions.RECENT_MONTHS].data,
		monthToDate: state.productionTrends[productionTrendsActions.MONTH_TO_DATE].data,
		weekToDate: state.productionTrends[productionTrendsActions.WEEK_TO_DATE].data,
		isFetchingData: isFetchingData
	}
}

const connectedProductionTrends = connect(mapStateToProps)(ProductionTrends)

export default connectedProductionTrends
