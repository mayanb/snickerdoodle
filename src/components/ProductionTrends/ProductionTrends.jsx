import React from 'react'
import { connect } from 'react-redux'
import * as processesActions from '../Processes/ProcessesActions.jsx'
import Loading from '../Loading/Loading'
import TrendsLineChart from './TrendsLineChart'
import Select from '../Inputs/Select'
import './styles/productiontrends.css'

class ProductionTrends extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			processType: null
		}

		this.handleProcessTypeChange = this.handleProcessTypeChange.bind(this)
	}

	componentDidMount() {
		this.props.dispatch(processesActions.fetchProcesses())
	}

	render() {
		const mockData = [
			{
				name: 'This Year',
				values: [
					{
						date: '20170801',
						value: 63.4,
					},
					{
						date: '20170901',
						value: 58.0,
					},
					{
						date: '20171001',
						value: 53.3,
					},
					{
						date: '20171101',
						value: 55.7,
					},
					{
						date: '20171201',
						value: 64.2,
					},
					{
						date: '20180101',
						value: 57.9,
					}
				]
			},
			{
				name: 'Last Year',
				values: [
					{
						date: '20170801',
						value: 62.7
					},
					{
						date: '20170901',
						value: 59.9
					},
					{
						date: '20171001',
						value: 59.1
					},
					{
						date: '20171101',
						value: 58.8
					},
					{
						date: '20171201',
						value: 58.7
					},
					{
						date: '20180101',
						value: 56.7
					},
				]
			}
		]

		//Set default process type
		if(this.props.processes.length && !this.state.processType) {
			const foil = this.props.processes.find(p => p.name === 'Foil')
			this.setState({processType: foil})
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
					<TrendsLineChart data={mockData} />
				</Loading>
			</div>
		)
	}

	handleProcessTypeChange(newVal) {
		this.setState({ processType: newVal })
	}
}

const mapStateToProps = (state/*, props*/) => {
	return {
		processes: state.processes.data,
		ui: state.processes.ui,
	}
}

const connectedProductionTrends = connect(mapStateToProps)(ProductionTrends)

export default connectedProductionTrends
