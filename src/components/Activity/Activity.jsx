import React from 'react'
import $ from 'jquery'
import {Link} from 'react-router-dom'
import InventoryDetail from '../OldComponents/InventoryDetail.jsx'
import { InventoryFilter, Filters } from '../OldComponents/Inputs.jsx'
import {fetch, requestID, ZeroState} from '../OldComponents/APIManager.jsx'
import api from '../WaffleconeAPI/api'
import Loading from '../OldComponents/Loading.jsx'
import update from 'immutability-helper'
import {display} from '../OldComponents/Task.jsx'
import moment from 'moment'
import Datepicker from '../Datepicker/Datepicker.jsx'
import ReactImageFallback from "react-image-fallback";
import Goals from '../Goals/Goals'
import MustEnablePopupsDialog from './MustEnablePopupsDialog'
import MustConnectGoogleDialog from './MustConnectGoogleDialog'

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
		} else if (!this.state.processes || Object.values(this.state.processes).length == 0) {
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
						expanded={this.state.expanded.process==process.process_id?this.state.expanded:null}
					/>
				}, this)
			)
		}

		return (
			<div>
				{ this.renderDialog() }
				<div className={`activity page ${this.state.mini?"mini":""}`}>

					<Goals />
				</div>

				<div className={`activity page ${this.state.mini?"mini":""}`}>
					<div className="content">
						<div className="activity-header page-header">
							<h2 className="card-header">Activity Log</h2>
							<div style={{zIndex: 0}}><Datepicker initialDates={this.state.dates} onChange={this.handleDateRangeChange.bind(this)} /></div>
						</div>
						{contentArea}
					</div>
				</div>
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



	handleOriginClick(process, origin) {
		if (process == this.state.expanded.process && origin == this.state.expanded.origin) {
			this.setState({expanded: {process: process, origin: -1}})
		} else {
			this.setState({expanded: {process: process, origin: origin}})
			this.getTasks(this.state.processes[process], this.state.processes[process].origins[origin])
		}
	}

	handleProcessClick(process) {
		if (process == this.state.expanded.process) {
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
			start: toUTCString(range.start), 
			end: toUTCString(range.end, true)
		}

		let url = "/ics/activity/detail/"
		let component = this

		let rID = requestID()
		this.lastTaskRequestID = rID

		console.log(params.start)
		console.log(params.end)

		api.get(url)
			.query(`start=${params.start}&end=${params.end}&process_type=${processID}&product_type=${productID}`)
			.end(function (err, res) {
				console.log(res)
				if (err || !res.ok) {
					console.log(err)
					component.setState({taskLoading: false})
					return
				}
				if (component.lastTaskRequestID != rID) 
					return
				component.setState({expandedTasks: res.body, taskLoading: false})
			})
	}

	getActivity(range) {
		this.setState({loading: true})
		let url = "/ics/activity/"
		let params = {start: toUTCString(range.start), end: toUTCString(range.end, true)}
		let component = this

		let rID = requestID()
		this.lastRequestID = rID

		api.get("/ics/activity/")
			.query(params)
			.end(function (err, res) {
				let data = res.body
				if (component.lastRequestID != rID) 
					return

				if (err || !res.ok)
					alert("ugh something went wrong\n" + err)

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
			processes[pid].runs += parseInt(skew.runs)
			processes[pid].outputs += parseInt(skew.outputs)
			processes[pid].origins.push(skew)
		}
		return processes
	}

	attemptSpreadsheet(params) {
		let is_connected = api.get_active_user().user.has_gauth_token
		if (is_connected) {
			this.createSpreadsheet(params)
		}
		else {
			this.toggleDialog('mustConnectGoogleDialog')
		}
	}

	createSpreadsheet(params) {
		let c = this
		api.post('/gauth/create-spreadsheet/')
			.type('form')
			.send(params)
			.end(function (err, res) {
				if (err || !res.ok) {
					alert("ugh something went wrong\n" + err)				
				}
				else {
					console.log(res.body.spreadsheetId)
					let url = 'https://docs.google.com/spreadsheets/d/' + res.body.spreadsheetId + '/'
					var newWin = window.open(url, '_blank');
					if(!newWin || newWin.closed || typeof newWin.closed=='undefined') 
					{
						//POPUP BLOCKED
						c.toggleDialog('mustEnablePopupsDialog')
					}
				}
				// window.location.href = res.text
			})
	}

}


function Process(props) {
	let origins = false


	if (props.expanded != null) {
		origins = props.origins.map(function (origin, i) {
			return <Origin 
				key={i} 
				{...origin} 
				onClick={() => props.onOriginClick(props.process_id, i)} 
				process_unit={props.process_unit} 
				expanded={props.expanded.origin==i}
				expandedTasks={props.expandedTasks}
			/>
		}, this)
	}

	let user_id = api.get_active_user().user.user_id

	let button = <button 
		onClick={(e) => props.spreadsheet({"user_id": user_id, "process": props.process_id, "start": toUTCString(props.dates.start), "end": toUTCString(props.dates.end, true)})}
	><i className="material-icons" >file_download</i></button>

	return (
		<div className={ "activity-process " + (props.expanded?"expanded":"")}> 
			<div onClick={() => props.onClick(props.process_id)}>
				<Row className="activity-process-header"
					img={props.process_name.toLowerCase().replace(/\s/g, '')}
					first={props.process_code}         
					second={props.process_name}
					third={pl(props.runs, "run")}
					fourth={pl(parseInt(props.outputs), props.process_unit)}
					fifth={"0 flagged"}
					sixth={"0 experimental"}
					seventh={button}

				/>
			</div>
			{origins}
		</div>
	)
}

function Origin(props) {
	var taskList = false
	if (props.expanded) {
		taskList = props.expandedTasks.map(function (task) {
			return <TaskList {...task} process_unit={props.process_unit}/>
		})
	}
	return (
		<div className={props.expanded?"expanded-origin":""}>
			<div onClick={props.onClick}>
				<Row className="process-origin-header"
					icon={props.expanded?"expand_more":"chevron_right"} 
					first={props.product_code}
					second={pl(props.runs, "run")}
					third={pl(parseInt(props.outputs), props.process_unit)}
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
		let errorImg = `${process.env.PUBLIC_URL}/public/img/default@3x.png`
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
			third={pl(parseInt(props.outputs), props.process_unit)}
			fourth={"--"}
			fifth={"--"}
		/>
		</div>
	)
}

function pl(count, unit) {
	if (count) {

	}
	if (count == 1) 
		return count + " " + unit
	return count + " " + unit + "s"
}


function toUTCString(dateString, addOne) {
	var m = moment(dateString + " 00:00:00")

	if (addOne) {
		m.add(24, "hours")
	}

	return m.utc().format('YYYY-MM-DD-HH-mm-ss-SSSSSS')
}
