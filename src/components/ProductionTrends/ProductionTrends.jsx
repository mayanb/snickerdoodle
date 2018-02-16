import React from 'react'
import { connect } from 'react-redux'
import * as processesActions from '../Processes/ProcessesActions.jsx'
import * as productionTrendsActions from '../ProductionTrends/ProductionTrendsActions.jsx'
import Loading from '../Loading/Loading'
import TrendsLineChart from './TrendsLineChart'
import Select from '../Inputs/Select'
import './styles/productiontrends.css'
import CumulativeAreaChart from "../CumulativeAreaChart/CumulativeAreaChart"
import { pluralize } from "../../utilities/stringutils"

class ProductionTrends extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			processType: null,
		}

		this.handleSearch = this.handleSearch.bind(this)

	}

	componentDidMount() {
		this.props.dispatch(processesActions.fetchProcesses())

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
				<Loading isFetchingData={this.props.ui.isFetchingData}>
					<Title>Production Trends</Title>
					<div className="options">
						<Select
							openOnFocus
							clearable={false}
							value={this.state.processType}
							options={this.props.processes}
							labelKey={'name'}
							valueKey={'id'}
							placeholder="Select a process type"
							onChange={(newVal) => this.handleProcessTypeChange(newVal)}
						/>
					</div>
					<Subtitle>Past 12 months (total per month)</Subtitle>
					<TrendsLineChart data={this.props.recentMonths} unitLabel={unitLabel} />
					<div className="cumulatives">
						<div>
							<Subtitle>Week to date (cumulative total)</Subtitle>
							<CumulativeAreaChart data={this.props.weekToDate} unitLabel={unitLabel} />
						</div>
						<div>
							<Subtitle>Month to date (cumulative total)</Subtitle>
							<CumulativeAreaChart data={this.props.monthToDate} unitLabel={unitLabel} />
						</div>
					</div>
				</Loading>
			</div>
		)
	}

	handleSearch() {
		this.props.dispatch(productionTrendsActions.fetchRecentMonths(this.state.processType.id))
		this.props.dispatch(productionTrendsActions.fetchMonthToDate(this.state.processType.id))
		this.props.dispatch(productionTrendsActions.fetchWeekToDate(this.state.processType.id))
	}

	handleProcessTypeChange(newVal) {
		this.setState({ processType: newVal }, this.handleSearch)
	}
}

function Title(props) {
	return (
		<div className="trends-title">{props.children}</div>
	)
}

function Subtitle(props) {
	return (
		<div className="trends-subtitle">{props.children}</div>
	)
}

const mapStateToProps = (state/*, props*/) => {
	return {
		processes: state.processes.data,
		recentMonths: state.productionTrends[productionTrendsActions.RECENT_MONTHS].data,
		monthToDate: state.productionTrends[productionTrendsActions.MONTH_TO_DATE].data,
		weekToDate: state.productionTrends[productionTrendsActions.WEEK_TO_DATE].data,
		ui: state.processes.ui,
	}
}

const connectedProductionTrends = connect(mapStateToProps)(ProductionTrends)

export default connectedProductionTrends
