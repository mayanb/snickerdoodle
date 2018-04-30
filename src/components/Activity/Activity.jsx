import React from 'react'
import {connect} from "react-redux"
import {requestID, ZeroState} from '../OldComponents/APIManager.jsx'
import api from '../WaffleconeAPI/api'
import Loading from '../OldComponents/Loading.jsx'
import update from 'immutability-helper'
import moment from 'moment'
import { dateToUTCString } from '../../utilities/dateutils'
import Datepicker from '../Datepicker/Datepicker.jsx'
import ReactImageFallback from "react-image-fallback"
import MustEnablePopupsDialog from './MustEnablePopupsDialog'
import MustConnectGoogleDialog from './MustConnectGoogleDialog'
import './styles/activity.css'
import ActivityListItem from './ActivityListItem'
import ObjectList from '../ObjectList/ObjectList'
import ActivityListHeader from './ActivityListHeader'
import PaginatedTable from '../PaginatedTable/PaginatedTable.jsx'
import * as actions from "../Processes/ProcessesActions";
import './styles/activitylist.css'



class Activity extends React.Component {
	constructor(props) {
		super(props)
		this.lastRequestID = -1
		this.lastTaskRequestID = -1
		this.state = {
			dates: {start: moment(new Date()).format("YYYY-MM-DD"), end: moment(new Date()).format("YYYY-MM-DD")},
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
	}
	
	toggleDialog(dialog) {
		this.setState({[dialog]: !this.state[dialog]})
	}
	
	componentDidMount() {
		this.getActivity(this.state.dates)
	}
	
	handleDateRangeChange(obj) {
		this.setState({dates: obj})
		this.getActivity(obj)
	}
	
	handleSelect(item) {
		console.log('Clicked item: ', item)
	}
	
	handlePagination(direction) {
		this.props.dispatch(actions.pageProcesses(direction))
	}
	
	render() {
		return (
			<div className="activity">
				<LittleHeader>Activity</LittleHeader>
				<div className="page mini">
					<div className="content">
						{this.renderDialog()}
						
						<div className="activity-header page-header">
							<h2>Logs</h2>
							<div style={{zIndex: 0}}><Datepicker initialDates={this.state.dates}
																									 onChange={this.handleDateRangeChange.bind(this)}/></div>
						</div>
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
	
	getTasks(process, origin) {
		let range = this.state.dates
		this.setState({taskLoading: true})
		let processID = process.process_id
		let productID = origin.product_id
		
		let params = {
			process_type: processID,
			product_type: productID,
			start: dateToUTCString(range.start),
			end: dateToUTCString(range.end, true)
		}
		
		let url = "/ics/activity/detail/"
		let component = this
		
		let rID = requestID()
		this.lastTaskRequestID = rID
		
		api.get(url)
			.query(`start=${params.start}&end=${params.end}&process_type=${processID}&product_type=${productID}`)
			.end(function (err, res) {
				console.log(res)
				if (err || !res.ok) {
					console.log(err)
					component.setState({taskLoading: false})
					return
				}
				if (component.lastTaskRequestID !== rID)
					return
				component.setState({expandedTasks: res.body, taskLoading: false})
			})
	}
	
	getActivity(range) {
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

function LittleHeader(props) {
	return (
		<span className="little-header" style={{fontSize: "14px", lineHeight: "16px", color: '#445562', padding: "16px 0px", display: 'block'}}>
			{props.children}
		</span>
	)
}

const mapStateToProps = (state) => {
	return {
		data: state.products.data,
		ui: state.products.ui,
	}
}

const connectedActivity = connect(mapStateToProps)(Activity)

export default connectedActivity


