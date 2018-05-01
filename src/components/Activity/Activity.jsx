import React from 'react'
import {connect} from "react-redux"
import {requestID, ZeroState} from '../OldComponents/APIManager.jsx'
import api from '../WaffleconeAPI/api'
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
import * as actions from "../ActivitySummary/ActivityActions"
import './styles/activitylist.css'

class Activity extends React.Component {
	constructor(props) {
		super(props)
		this.lastRequestID = -1
		this.lastTaskRequestID = -1
		this.state = {
			filters: {
				dates: {start: moment(new Date()).format("YYYY-MM-DD"), end: moment(new Date()).format("YYYY-MM-DD")},
				processTypes: [],
				productTypes: [],
				keywords: '',
				flaggedOnly: false,
				aggregateProducts: false,
			},
			processes: {},
			
			expanded: {process: 0, origin: 0},
			expandedTasks: [],
			
			loading: true,
			taskLoading: false,
			mini: true,
			
			mustConnectGoogleDialog: false,
			mustEnablePopupsDialog: false,
		}
		
		this.handlePagination = this.handlePagination.bind(this)
		this.handleFilterChange = this.handleFilterChange.bind(this)
	}
	
	toggleDialog(dialog) {
		this.setState({[dialog]: !this.state[dialog]})
	}
	
	componentDidMount() {
		this.getActivity(this.state.filters)
	}
	
	handleFilterChange(filters) {
		this.setState({filters: filters})
		this.getActivity(filters)
	}
	
	handleSelect(item) {
		console.log('Clicked item: ', item)
	}
	
	handlePagination(direction) {
		this.props.dispatch(actions.pageActivity(direction))
	}
	
	render() {
		return (
			<div className="activity">
				<ApplicationSectionHeader>Activity Log</ApplicationSectionHeader>
				<ActivityFilters filters={this.state.filters} onFilterChange={this.handleFilterChange}/>
				<div className="page mini">
					<div className="content">
						{this.renderDialog()}
						{this.renderTable()}
					</div>
				</div>
				{this.renderRecipeHelp()}
			</div>
		)
	}
	
	renderTable() {
		if (this.state.loading) {
			return <Loading/>
		} else if (!this.state.processes || Object.values(this.state.processes).length === 0) {
			return <ZeroState/>
		} else {
			return (
				<div>
					<ObjectList className="products" isFetchingData={this.state.loading}>
						<PaginatedTable
							data={this.state.processes}
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
	
	renderDialog() {
		if (this.state.mustEnablePopupsDialog) {
			return <MustEnablePopupsDialog onToggle={() => this.toggleDialog('mustEnablePopupsDialog')}/>
		} else if (this.state.mustConnectGoogleDialog) {
			return <MustConnectGoogleDialog onToggle={() => this.toggleDialog('mustConnectGoogleDialog')}/>
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
		this.setState({loading: true})
		let params = {start: dateToUTCString(range.start), end: dateToUTCString(range.end, true)}
		let component = this
		
		let rID = requestID()
		this.lastRequestID = rID
		
		api.get("/ics/activity/")
			.query(params)
			.end(function (err, res) {
				let data = res.body
				if (component.lastRequestID !== rID)
					return
				
				if (err || !res.ok)
					console.error("ugh something went wrong\n" + err)
				component.lastTaskRequestID = -1
				component.setState({
					processes: data,
					expanded: {process: -1, origin: -1},
					expandedTasks: [],
					taskLoading: false, loading: false
				})
			})
	}
}

const mapStateToProps = (state) => {
	return {
		data: state.activity.data,
		ui: state.activity.ui,
	}
}

const connectedActivity = connect(mapStateToProps)(Activity)

export default connectedActivity
