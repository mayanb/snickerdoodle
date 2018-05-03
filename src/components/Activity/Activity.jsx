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
	}

	toggleDialog(dialog) {
		this.setState({ [dialog]: !this.state[dialog] })
	}

	componentDidMount() {
		this.getActivity(this.state.filters)
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

	handlePagination(direction) {
		this.props.dispatch(actions.pageActivity(direction))
	}

	render() {
		return (
			<div className="activity">
				<ApplicationSectionHeader>Activity Log</ApplicationSectionHeader>
				<ActivityFilters filters={this.state.filters} onFilterChange={this.handleFilterChange} />
					<div className="content">
						{this.renderDialog()}
						{this.renderTaskDialog()}
						{this.renderTable()}
					</div>
				{this.renderRecipeHelp()}
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
					<ObjectList className="products" isFetchingData={isFetchingData}>
						<PaginatedTable
							data={this.props.data}
							ui={this.props.ui}
							Row={ActivityListItem}
							TitleRow={ActivityListHeader}
							onClick={this.handleSelect}
							onPagination={this.handlePagination}
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

	renderRecipeHelp() {
		return (
			<div className="activity-page-recipe-help"
			     onClick={() => window.open("https://polymer.helpscoutdocs.com/article/10-understanding-recipes", '_blank')}>
				<div className="activity-page-recipe-help-header">Create recipes for your products</div>
				<div>
					<span>Guide your team with instructions and ingredients and keep your inventory accurate. </span>
					<span className="activity-page-recipe-help-link">
						Learn how to supercharge your team now.  
					</span>
					<span className="activity-page-forward">  <i
						className="material-icons activity-page-forward-i">arrow_forward</i></span>
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
	}
}

export default connect(mapStateToProps)(Activity)

