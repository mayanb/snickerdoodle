import React from 'react'
import { connect } from "react-redux"
import { ZeroState } from '../OldComponents/APIManager.jsx'
import Loading from '../OldComponents/Loading.jsx'
import moment from 'moment'
import { dateToUTCString } from '../../utilities/dateutils'
import MustEnablePopupsDialog from './MustEnablePopupsDialog'
import MustConnectGoogleDialog from './MustConnectGoogleDialog'
import './styles/activity.css'
import ActivityListItem from './ActivityListItem'
import ActivityFilters from './ActivityFilters'
import ObjectList from '../ObjectList/ObjectList'
import ActivityListHeader from './ActivityListHeader'
import PaginatedTable from '../PaginatedTable/PaginatedTable.jsx'
import ApplicationSectionHeader from '../Application/ApplicationSectionHeader'
import TaskDialogSimple from '../TaskDialog/TaskDialogSimple'
import * as actions from "./ActivityActions"
import * as taskActions from "../TaskPage/TaskActions"
import * as processesActions from '../Processes/ProcessesActions.jsx'
import * as productsActions from '../Products/ProductsActions.jsx'
import { isDandelion } from '../../utilities/userutils'
import api from '../WaffleconeAPI/api'

import './styles/activitylist.css'

class Activity extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			filters: {
				dates: { start: moment(new Date()).format("YYYY-MM-DD"), end: moment(new Date()).format("YYYY-MM-DD") },
				processTypes: [],
				productTypes: [],
				keywords: '',
				flaggedOnly: false,
				aggregateProducts: false,
			},

			selectedRow: null,

			mustConnectGoogleDialog: false,
			mustEnablePopupsDialog: false,
		}

		this.handlePagination = this.handlePagination.bind(this)
		this.handleFilterChange = this.handleFilterChange.bind(this)
		this.handleSelect = this.handleSelect.bind(this)
		this.handleDownloadRow = this.handleDownloadRow.bind(this)
		this.handleDownloadAll = this.handleDownloadAll.bind(this)
	}

	toggleDialog(dialog) {
		this.setState({ [dialog]: !this.state[dialog] })
	}

	componentDidMount() {
		this.getActivity(this.state.filters)
		this.props.dispatch(processesActions.fetchProcesses())
		this.props.dispatch(productsActions.fetchProducts())
	}

	handleFilterChange(filters) {
		this.setState({ filters: filters })
		this.getActivity(filters)
	}

	handleSelect(index) {
		this.setState({ selectedRow: index })
		const row = this.props.data[index]
		const { filters } = this.state
		let params = {
			start: dateToUTCString(filters.dates.start),
			end: dateToUTCString(filters.dates.end, true),
			processes: row.process_type.id,
			products: row.product_types.map(pt => pt.id).join(',')
		}
		if (filters.keywords) {
			params.label = filters.keywords
			params.dashboard = 'true'
		}
		if (filters.flaggedOnly) {
			params.flagged = 'true'
		}

		this.props.dispatch(taskActions.getTasks(params))
	}

	handleDownloadAll() {
		const processTypes = this.state.filters.processTypes.length ?
			this.state.filters.processTypes :
			[...new Set(this.props.data.map(row => row.process_type.id))]
		const productTypes = this.state.filters.productTypes.length ?
			this.state.filters.productTypes :
			[...new Set([].concat(...this.props.data.map(row => row.product_types.map(p => p.id))))]
		return this.handleDownload(processTypes, productTypes)
	}

	handleDownloadRow(index) {
		const row = this.props.data[index]
		return this.handleDownload([row.process_type.id], row.product_types.map(p => p.id))
	}

	handleDownload(processTypeIDs, productTypeIDs) {
		const { filters } = this.state
		let user_id = api.get_active_user().user.user_id
		let params = {
			start: dateToUTCString(filters.dates.start),
			end: dateToUTCString(filters.dates.end, true),
			processes: processTypeIDs.join(','),
			products: productTypeIDs.join(','),
			user_id: user_id,
		}
		if (filters.keywords) {
			params.label = filters.keywords
			params.dashboard = 'true'
		}
		if (filters.flaggedOnly) {
			params.flagged = 'true'
		}

		let team = api.get_active_user().user.team_name
		if (isDandelion(team)) {
			return this.createCSV(params)
		}

		let is_connected = api.get_active_user().user.has_gauth_token
		if (is_connected) {
			return this.createSpreadsheet(params)
		}
		else {
			this.toggleDialog('mustConnectGoogleDialog')
			return new Promise(resolve => resolve())
		}
	}

	createCSV(params) {
		let { start, end } = this.state.filters.dates
		let name
		if(params.processes.length === 1) {
			name = this.props.processes.find(p => String(p.id) === params.processes[0]).name
		} else {
			name = 'Runs'
		}
		const title = `${name} - ${start}-${end}`
		return this.props.dispatch(actions.fetchCsv(params, title))
	}

	createSpreadsheet(params) {
		let c = this
		return this.props.dispatch(actions.fetchGoogleSheet(params))
			.then(res => {
				let url = 'https://docs.google.com/spreadsheets/d/' + res.body.spreadsheetId + '/'
				let newWin = window.open(url, '_blank');
				if (!newWin || newWin.closed || typeof newWin.closed === 'undefined') {
					//POPUP BLOCKED
					c.toggleDialog('mustEnablePopupsDialog')
				}
			})
	}

	handlePagination(direction) {
		this.props.dispatch(actions.pageActivity(direction))
	}

	render() {
		const { data, processes, products } = this.props
		return (
			<div className="activity">
				<ApplicationSectionHeader>Activity Log</ApplicationSectionHeader>
				<ActivityFilters
					filters={this.state.filters}
					onFilterChange={this.handleFilterChange}
					onDownload={this.handleDownloadAll}
					downloadDisabled={!data.length}
					processes={processes}
					products={products}
				/>
					<div className="content">
						{this.renderDialog()}
						{this.renderTaskDialog()}
						{this.renderTable()}
					</div>
				{this.renderHelp()}
			</div>
		)
	}

	renderTable() {
		const { isFetchingData } = this.props.ui
		if (isFetchingData) {
			return <Loading />
		} else if (!this.props.data || Object.values(this.props.data).length === 0) {
			return <ZeroState />
		} else {
			return (
				<div>
					<ObjectList className="activity-log" isFetchingData={isFetchingData}>
						<PaginatedTable
							data={this.props.data}
							ui={this.props.ui}
							Row={ActivityListItem}
							TitleRow={ActivityListHeader}
							onPagination={this.handlePagination}
							extra={{onViewTasks: this.handleSelect, onDownload: this.handleDownloadRow}}
						/>
					</ObjectList>
				</div>
			)
		}
	}

	renderTaskDialog() {
		const { selectedRow } = this.state
		const tasks = this.props.tasksUI.isFetchingData ? [] : this.props.tasks
		return selectedRow !== null && (
			<TaskDialogSimple
				header="Tasks"
				onToggle={() => this.setState({ selectedRow: null })}
				tasks={tasks}
			/>
		)
	}

	renderDialog() {
		if (this.state.mustEnablePopupsDialog) {
			return <MustEnablePopupsDialog onToggle={() => this.toggleDialog('mustEnablePopupsDialog')} />
		} else if (this.state.mustConnectGoogleDialog) {
			return <MustConnectGoogleDialog onToggle={() => this.toggleDialog('mustConnectGoogleDialog')} />
		} else return null
	}

	renderHelp() {
		return (
			<div className="activity-page-help-container">
				<div className="activity-page-help"
				     onClick={() => window.open("https://polymer.helpscoutdocs.com/article/12-using-the-new-activity-log", '_blank')}>
					<div className="activity-page-help-header">Check out our new activity log</div>
					<div>
						<span>Quickly find activities for a particular process or product. Download information for all runs at once. </span>
						<span className="activity-page-help-link">
						Learn more about the new activity log.
					</span>
						<span className="activity-page-forward">  <i
							className="material-icons activity-page-forward-i">arrow_forward</i></span>
					</div>
				</div>
				<div className="activity-page-help"
				     onClick={() => window.open("https://polymer.helpscoutdocs.com/article/10-understanding-recipes", '_blank')}>
					<div className="activity-page-help-header">Create recipes for your products</div>
					<div>
						<span>Guide your team with instructions and ingredients and keep your inventory accurate. </span>
						<span className="activity-page-help-link">
						Learn how to supercharge your team now.  
					</span>
						<span className="activity-page-forward">  <i
							className="material-icons activity-page-forward-i">arrow_forward</i></span>
					</div>
				</div>
			</div>
		)
	}

	getActivity(filters) {
		const range = filters.dates
		let params = {
			start: dateToUTCString(range.start),
			end: dateToUTCString(range.end, true),
		}
		if (filters.processTypes.length) {
			params.process_types = filters.processTypes.map(p => p.id).join(',')
		}
		if (filters.productTypes.length) {
			params.product_types = filters.productTypes.map(p => p.id).join(',')
		}
		if (filters.keywords) {
			params.label = filters.keywords
		}
		if (filters.flaggedOnly) {
			params.flagged = 'true'
		}
		if (filters.aggregateProducts) {
			params.aggregate_products = 'true'
		}
		this.props.dispatch(actions.fetchActivity(params))
	}
}

const mapStateToProps = (state) => {
	return {
		data: state.activity.data,
		ui: state.activity.ui,
		tasks: state.tasks.data,
		tasksUI: state.tasks.ui,
		processes: state.processes.data,
		products: state.products.data,
	}
}

export default connect(mapStateToProps)(Activity)

