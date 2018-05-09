import React from 'react'
import { connect } from 'react-redux'
import * as processesActions from '../Processes/ProcessesActions.jsx'
import * as productsActions from '../Products/ProductsActions.jsx'
import * as productionTrendsActions from '../ProductionTrends/ProductionTrendsActions.jsx'
import Loading from '../Loading/Loading'
import TrendsLineChart from './TrendsLineChart'
import { Select } from 'antd'
import './styles/productiontrends.css'
import CumulativeAreaChart from "../CumulativeAreaChart/CumulativeAreaChart"
import Img from '../Img/Img'
import { pluralize } from "../../utilities/stringutils"
import { processProductFilter, formatOption } from '../../utilities/filters'

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
		this.handleProcessTypeChange = this.handleProcessTypeChange.bind(this)
		this.handleProductTypeChange = this.handleProductTypeChange.bind(this)
	}

	componentDidMount() {
		Promise.all([
			this.props.dispatch(processesActions.fetchProcesses()),
			this.props.dispatch(productsActions.fetchProducts())
		])
			.then(() => {
				//Set default process type
				if (this.props.processes.length && !this.state.processType) {
					const foil = this.props.processes.find(p => p.name === 'Foil')
					const defaultProcessType = foil ? foil : this.props.processes[0]

					this.setState({ processType: defaultProcessType }, this.handleSearch)
				}
			})
	}

	render() {
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
						<TrendsLineChart width={CHART_WIDTH} height={CHART_HEIGHT} data={this.props.recentMonths}
						                 unitLabel={unitLabel} />
						<div className="cumulatives">
							<div>
								<Subtitle>
									What did you make <b>&nbsp;this week?</b>
									<Help>Displays this week's cumulative total production for each day</Help>
								</Subtitle>
								<CumulativeAreaChart width={CHART_WIDTH / 2} height={CHART_HEIGHT} data={this.props.weekToDate}
								                     unitLabel={unitLabel} labelDays={true} />
							</div>
							<div>
								<Subtitle>
									What did you make <b>&nbsp;this month?</b>
									<Help>Displays this month's cumulative total production for each day</Help>
								</Subtitle>
								<CumulativeAreaChart width={CHART_WIDTH / 2} height={CHART_HEIGHT} data={this.props.monthToDate}
								                     unitLabel={unitLabel} />
							</div>
						</div>
					</div>
				</Loading>
			</div>
		)
	}

	renderOptions() {
		if (!this.state.processType) {
			return null
		}
		const formatProcessOption = p => `${formatOption(p)} (${pluralize(2, p.unit)})`
		return (
			<div className="options">
				<Select
					defaultValue={formatProcessOption(this.state.processType)}
					filterOption={processProductFilter}
					onChange={this.handleProcessTypeChange}
				>
					{this.props.processes.map(p => <Select.Option key={p.id} data={p}>
							{formatProcessOption(p)}
						</Select.Option>
					)}
				</Select>
				<Select
					mode="multiple"
					allowClear
					placeholder="Showing all products"
					filterOption={processProductFilter}
					onChange={this.handleProductTypeChange}
				>
					{this.props.products.map(p => <Select.Option key={p.id} data={p}>
							{formatOption(p)}
						</Select.Option>
					)}
				</Select>
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

	handleProductTypeChange(productTypeIDs) {
		const productTypes = productTypeIDs.map(id => this.props.products.find(p => String(p.id) === id))
		console.log({ productTypes })
		this.setState({ productTypes: productTypes }, this.handleSearch)
	}
}

function Subtitle(props) {
	return (
		<div className="trends-subtitle">{props.children}</div>
	)
}

function Help({ children }) {
	return (
		<div className="help">
			<Img src="help@2x" />
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
