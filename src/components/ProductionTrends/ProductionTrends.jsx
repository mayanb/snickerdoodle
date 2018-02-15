import React from 'react'
import { connect } from 'react-redux'
import * as processesActions from '../Processes/ProcessesActions.jsx'
import * as productionTrendsActions from '../ProductionTrends/ProductionTrendsActions.jsx'
import Loading from '../Loading/Loading'
import TrendsLineChart from './TrendsLineChart'
import Select from '../Inputs/Select'
import './styles/productiontrends.css'
import { toUTCString } from '../../utilities/dateutils'
import CumulativeAreaChart from "../CumulativeAreaChart/CumulativeAreaChart"

class ProductionTrends extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			processType: null,
			start: toUTCString('2017-01-01'),
			end: toUTCString('2020-12-31')
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
					<div className="charts">
						<TrendsLineChart data={this.props.productionTrends} />
						<div className="cumulatives">
							<Subtitle>Cumulative total this week</Subtitle>
							<CumulativeAreaChart data={this.props.productionTrends} />
							<Subtitle>Cumulative total this month</Subtitle>
							<CumulativeAreaChart data={this.props.productionTrends} />
						</div>
					</div>
				</Loading>
			</div>
		)
	}

	handleSearch() {
		this.props.dispatch(productionTrendsActions.fetchProductionTrends({
			process_type: this.state.processType.id,
			start: this.state.start,
			end: this.state.end
		}))
	}

	handleProcessTypeChange(newVal) {
		this.setState({ processType: newVal }, this.handleSearch)
	}
}

const mapStateToProps = (state/*, props*/) => {
	return {
		processes: state.processes.data,
		productionTrends: state.productionTrends.data,
		ui: state.processes.ui,
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

const connectedProductionTrends = connect(mapStateToProps)(ProductionTrends)

export default connectedProductionTrends
