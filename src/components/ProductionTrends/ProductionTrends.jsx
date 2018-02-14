import React from 'react'
import { connect } from 'react-redux'
import * as processesActions from '../Processes/ProcessesActions.jsx'
import * as productionTrendsActions from '../ProductionTrends/ProductionTrendsActions.jsx'
import Loading from '../Loading/Loading'
import TrendsLineChart from './TrendsLineChart'
import Select from '../Inputs/Select'
import './styles/productiontrends.css'

import moment from 'moment'
import { toUTCString } from '../../utilities/dateutils'

class ProductionTrends extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			processType: null,
			start: toUTCString('2017-09-01'),
			end: toUTCString('2018-01-31')
		}

		this.handleSearch = this.handleSearch.bind(this)

	}

	componentDidMount() {
		this.props.dispatch(processesActions.fetchProcesses())

	}

	render() {

		//Set default process type
		if(this.props.processes.length && !this.state.processType) {
			const foil = this.props.processes.find(p => p.name === 'Foil')
			this.setState({processType: foil}, this.handleSearch)
		}

		return (
			<div className="production-trends">
				<Loading isFetchingData={this.props.ui.isFetchingData}>
					<span style={{
						fontSize: "20px",
						lineHeight: "32px",
						color: '#445562',
						paddingTop: '5px',
						paddingBottom: '11px',
						display: 'block'
					}}>
						Production Trends
					</span>
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
					<TrendsLineChart data={this.props.productionTrends} />
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

const connectedProductionTrends = connect(mapStateToProps)(ProductionTrends)

export default connectedProductionTrends
