import React from 'react'
import { connect } from 'react-redux'
import * as productionTrendsActions from '../ProductionTrends/ProductionTrendsActions.jsx'
import Loading from '../Loading/Loading'
import TrendsLineChart from './TrendsLineChart'
import { Select } from 'antd'
import './styles/productiontrends.css'
import CumulativeAreaChart from "../CumulativeAreaChart/CumulativeAreaChart"
import Img from '../Img/Img'
import { pluralize } from "../../utilities/stringutils"
import { processProductFilter, formatOption } from '../../utilities/filters'
import { checkEqual } from '../../utilities/arrayutils'

const CHART_HEIGHT = 200
const CHART_WIDTH = 900

class ProductionTrends extends React.Component {
	constructor(props) {
		super(props)

		this.handleSearch = this.handleSearch.bind(this)
		this.handleProcessTypeChange = this.handleProcessTypeChange.bind(this)
		this.handleProductTypeChange = this.handleProductTypeChange.bind(this)
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.selectedProcess !== this.props.selectedProcess ||
			!checkEqual(nextProps.selectedProducts, this.props.selectedProducts)) {
			this.handleSearch(nextProps.selectedProcess, nextProps.selectedProducts)
		}
	}

	componentDidMount() {
		if (this.props.selectedProcess) {
			this.handleSearch(this.props.selectedProcess, this.props.selectedProducts)
		}
	}

	render() {
		const { selectedProcess, processes } = this.props

		if (!selectedProcess || !processes || !processes.length) {
			return null
		}

		const unitLabel = selectedProcess ? pluralize(2, processes.find(p => String(p.id) === String(selectedProcess)).unit) : ''

		return (
			<div className="production-trends">
				{this.renderOptions()}
				<Loading isFetchingData={this.props.isFetchingData}>
					<div className="trends-content">
						<div className="every-month-header">
							<Subtitle>
								<b>How much do you make&nbsp;</b> every month?
								<Help>Displays total production for each month</Help>
							</Subtitle>
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
		const { processes, products, selectedProcess, selectedProducts } = this.props
		if (!selectedProcess || !processes.length) {
			return null
		}
		const formatProcessOption = p => `${formatOption(p)} (${pluralize(2, p.unit)})`
		const defaultProcessType = processes.find(p => String(p.id) === String(selectedProcess))
		return (
			<div className="options">
				<Select
					showSearch
					value={formatProcessOption(defaultProcessType)}
					filterOption={processProductFilter}
					onChange={this.handleProcessTypeChange}
				>
					{processes.map(p => <Select.Option key={p.id} data={p}>
							{formatProcessOption(p)}
						</Select.Option>
					)}
				</Select>
				<Select
					mode="multiple"
					value={selectedProducts}
					allowClear
					placeholder="Showing all products"
					filterOption={processProductFilter}
					onChange={this.handleProductTypeChange}
				>
					{products.map(p => <Select.Option key={p.id} data={p}>
							{formatOption(p)}
						</Select.Option>
					)}
				</Select>
			</div>
		)
	}

	handleSearch(selectedProcess, selectedProducts) {
		this.props.dispatch(productionTrendsActions.fetchRecentMonths(selectedProcess, selectedProducts))
		this.props.dispatch(productionTrendsActions.fetchMonthToDate(selectedProcess, selectedProducts))
		this.props.dispatch(productionTrendsActions.fetchWeekToDate(selectedProcess, selectedProducts))
	}

	handleProcessTypeChange(selectedProcess) {
		this.props.onFilterChanage(selectedProcess, this.props.selectedProducts)
	}

	handleProductTypeChange(selectedProducts) {
		this.props.onFilterChanage(this.props.selectedProcess, selectedProducts)
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
	const isFetchingData = state.productionTrends[productionTrendsActions.RECENT_MONTHS].ui.isFetchingData ||
		state.productionTrends[productionTrendsActions.MONTH_TO_DATE].ui.isFetchingData ||
		state.productionTrends[productionTrendsActions.WEEK_TO_DATE].ui.isFetchingData
	return {
		recentMonths: state.productionTrends[productionTrendsActions.RECENT_MONTHS].data,
		monthToDate: state.productionTrends[productionTrendsActions.MONTH_TO_DATE].data,
		weekToDate: state.productionTrends[productionTrendsActions.WEEK_TO_DATE].data,
		isFetchingData: isFetchingData
	}
}

const connectedProductionTrends = connect(mapStateToProps)(ProductionTrends)

export default connectedProductionTrends
