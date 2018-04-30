import React from 'react'
import {requestID, ZeroState} from '../OldComponents/APIManager.jsx'
import api from '../WaffleconeAPI/api'
import Loading from '../OldComponents/Loading.jsx'
import update from 'immutability-helper'
import {display} from '../OldComponents/Task.jsx'
import moment from 'moment'
import { dateToUTCString } from '../../utilities/dateutils'
import Datepicker from '../Datepicker/Datepicker.jsx'
import ReactImageFallback from "react-image-fallback"
import MustEnablePopupsDialog from './MustEnablePopupsDialog'
import MustConnectGoogleDialog from './MustConnectGoogleDialog'
import './styles/activity.css'
import Spinner from 'react-spinkit'
import fileDownload from 'js-file-download'
import { isDandelion } from '../../utilities/userutils'

export default class Activity extends React.Component {
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

	render() {

		let contentArea = false
		if (this.state.loading) {
			contentArea =  <Loading />
		} else if (!this.state.processes || Object.values(this.state.processes).length === 0) {
			contentArea = <ZeroState />
		} else {
			contentArea = (
				Object.values(this.state.processes).map(function (process, i) {
					return <Process 
						key={i} 
						dates={this.state.dates} 
						{...process} 
						expandedTasks={this.state.expandedTasks} 
						spreadsheet={this.attemptSpreadsheet.bind(this)} 
						onClick={this.handleProcessClick.bind(this)} 
						onOriginClick={this.handleOriginClick.bind(this)} 
						expanded={this.state.expanded.process===process.process_id?this.state.expanded:null}
					/>
				}, this)
			)
		}

		return (
			<div className="activity">
				<LittleHeader>Activity</LittleHeader>
				<div className="page mini">
					<div className="content">
						{this.renderDialog()}

						<div className="activity-header page-header">
							<h2>Logs</h2>
							<div style={{ zIndex: 0 }}><Datepicker initialDates={this.state.dates}
							                                       onChange={this.handleDateRangeChange.bind(this)} /></div>
						</div>
						{contentArea}
					</div>
				</div>
				{this.renderRecipeHelp()}
			</div>
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
			<div className="activity-page-recipe-help" onClick={() => window.open("https://polymer.helpscoutdocs.com/article/10-understanding-recipes", '_blank')}>
				<div className="activity-page-recipe-help-header">Create recipes for your products</div>
				<div>
					<span>Guide your team with instructions and ingredients and keep your inventory accurate. </span>
					<span className="activity-page-recipe-help-link">
						Learn how to supercharge your team now.
					</span>
				</div>
			</div>
		)
	}



	handleOriginClick(process, origin) {
		if (process === this.state.expanded.process && origin === this.state.expanded.origin) {
			this.setState({expanded: {process: process, origin: -1}})
		} else {
			this.setState({expanded: {process: process, origin: origin}})
			this.getTasks(this.state.processes[process], this.state.processes[process].origins[origin])
		}
	}

	handleProcessClick(process) {
		if (process === this.state.expanded.process) {
			this.setState({expanded: {process: -1, origin: -1}})
		} else {
			this.setState({expanded: {process: process, origin: -1}})
		}
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
					processes: component.nestProcesses(data), 
					expanded: {process:-1, origin:-1},
					expandedTasks: [],
					taskLoading: false, loading: false
				})
			})
			// .end(function (err, res) {
			//   if (component.lastRequestID != rID) 
			//     return
			//   component.setState({taskLoading: false, loading: false})
			// })
	}

	nestProcesses(data) {
		let processes = {}
		for (var s in data) {
			let skew = data[s]
			let pid = skew.process_id
			if(!processes[pid]) {
				processes[pid] = update({}, {$merge: skew})
				processes[pid].origins = []
				processes[pid].runs = 0
				processes[pid].outputs = 0
			}
			processes[pid].runs += parseInt(skew.runs, 10)
			processes[pid].outputs += parseInt(skew.outputs, 10)
			processes[pid].origins.push(skew)
		}
		return processes
	}

	attemptSpreadsheet(params) {
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
		let { start, end } = this.state.dates
		const title = `${params.process_name} - ${start}-${end}`
		return api.post('/gauth/create-csv/')
			.type('form')
			.send(params)
			.responseType('blob')
			.then(res => fileDownload(res.body, `${title}.csv`))
			.catch(err => {
				console.log("ugh something went wrong\n" + err)
			})

	}

	createSpreadsheet(params) {
		let c = this
		return api.post('/gauth/create-spreadsheet/')
			.type('form')
			.send(params)
			.then(res => {
				let url = 'https://docs.google.com/spreadsheets/d/' + res.body.spreadsheetId + '/'
				let newWin = window.open(url, '_blank');
				if (!newWin || newWin.closed || typeof newWin.closed === 'undefined') {
					//POPUP BLOCKED
					c.toggleDialog('mustEnablePopupsDialog')
				}
			})
			.catch(err => {
				console.log("ugh something went wrong\n" + err)
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

class Process extends React.Component {

	constructor(props) {
		super(props)
		this.state = { loadingSpreadsheet: false }
		this.handleCreateSpreadsheet = this.handleCreateSpreadsheet.bind(this)
	}

	render() {
		let origins = false
		let props = this.props

		if (props.expanded != null) {
			origins = props.origins.map(function (origin, i) {
				return <Origin
					key={i}
					{...origin}
					onClick={() => props.onOriginClick(props.process_id, i)}
					process_unit={props.process_unit}
					expanded={props.expanded.origin === i}
					expandedTasks={props.expandedTasks}
				/>
			}, this)
		}

		let button = this.state.loadingSpreadsheet ?
			<div className="loading-indicator"><Spinner name="circle" color="white" fadeIn="none" /></div> :
			<button onClick={this.handleCreateSpreadsheet}><i className="material-icons">file_download</i></button>


		return (
			<div className={"activity-process " + (props.expanded ? "expanded" : "")}>
				<div onClick={() => props.onClick(props.process_id)}>
					<Row className="activity-process-header"
					     img={props.process_name.toLowerCase().replace(/\s/g, '')}
					     first={props.process_code}
					     second={props.process_name}
					     third={pl(props.runs, "run")}
					     fourth={pl(parseInt(props.outputs, 10), props.process_unit)}
					     fifth={"0 flagged"}
					     sixth={"0 exp"}
					     seventh={button}

					/>
				</div>
				{origins}
			</div>
		)
	}

	handleCreateSpreadsheet(e) {
		e.stopPropagation()
		let user_id = api.get_active_user().user.user_id
		this.setState({ loadingSpreadsheet: true })
		this.props.spreadsheet({
			"user_id": user_id,
			"process": this.props.process_id,
			"start": dateToUTCString(this.props.dates.start),
			"end": dateToUTCString(this.props.dates.end, true),
			"process_name": this.props.process_name,
		}).finally(() => this.setState({ loadingSpreadsheet: false }))
	}
}

function Origin(props) {
	var taskList = false
	if (props.expanded) {
		taskList = props.expandedTasks.map(function (task) {
			return <TaskList {...task} process_unit={props.process_unit} key={task.id}/>
		})
	}
	return (
		<div className={props.expanded?"expanded-origin":""}>
			<div onClick={props.onClick}>
				<Row className="process-origin-header"
					icon={props.expanded?"expand_more":"chevron_right"} 
					first={props.product_code}
					second={pl(props.runs, "run")}
					third={pl(parseInt(props.outputs, 10), props.process_unit)}
					fourth={!props.flagged?"--":props.flagged + " flagged"}
					fifth={!props.experimental?"--":props.experimental + " experimental"}
				/>
			</div>
			{ taskList }
		</div>
	)
}

function Row(props) {
	var symbol = false 
	if (props.img) {
		let errorImg = `${process.env.PUBLIC_URL}/img/default@3x.png`
		symbol = <ReactImageFallback src={process.env.PUBLIC_URL + `/img/${props.img}@3x.png`} fallbackImage={errorImg}/>
	} else if (props.icon) {
		symbol = <span><i className="material-icons arrow">{props.icon}</i></span>
	}

	return (
		<div className={"activity-process-row " + props.className} >
			<div className={"min " + (props.img?"img":"")}>
				{symbol}
			</div>
			<div className="process-name">
				<span>{props.first}</span>
			</div>
			<div className="process-name">
				<span>{props.second}</span>
			</div>
			<div className="process-runs tiny">
				<span>{props.third}</span>
			</div>
			<div className="process-outputs">
				<span>{props.fourth}</span>
			</div>
			<div className="process-flagged tiny">
				<span>{props.fifth}</span>
			</div>
			<div className="process-experimental tiny">  
				<span>{props.sixth}</span>
			</div>
			<div className="process-button no">
				<span>{props.seventh}</span>
			</div>
		</div>
	)
}

function TaskList(props) {
	return (
		<div className="task-list">
		<Row className="process-origin-task"
			first={" "}
			second={<a href={window.location.origin + "/task/" + props.id} target="_blank">{display(props)}</a>}
			third={pl(parseInt(props.outputs, 10), props.process_unit)}
			fourth={"--"}
			fifth={"--"}
		/>
		</div>
	)
}

function pl(count, unit) {
	if (count) {

	}
	if (count === 1)
		return count + " " + unit
	return count + " " + unit + "s"
}



