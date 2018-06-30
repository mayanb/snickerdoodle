import React from 'react'
import Spinner from 'react-spinkit'
import './styles/taskform.css'
import './styles/peripherals.css'
import Input from '../Inputs/Input'
import Switch from '../Switch/Switch'
import TaskRecurrentAttribute from './TaskRecurrentAttribute'
import moment from 'moment'
import { DatePicker } from 'antd';
const TIME_TO_STAY_UNSAVED = 500
const TIME_TO_LOAD = 0 //any extra time you want to show the loader for
const TIME_TO_SHOW_SAVED = 1500

export default class TaskForm extends React.Component {
	render() {
		const { taskAttributes, onSave, onCreate, teamTimeFormat } = this.props
		return (
			<div className="task-form">
				{taskAttributes.map(a =>
					<AttributeField taskAttribute={a} key={a.id} onSave={onSave} onCreate={onCreate} teamTimeFormat={teamTimeFormat}/>
				)}
			</div>
		)
	}
}

class AttributeField extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isLoading: false,
			justSaved: false,
		}

		this.handleSave = this.handleSave.bind(this)
	}

	handleSave(value) {
		this.setState({ isLoading: true, hasError: false })
		const { values } = this.props.taskAttribute
		let apiPromise
		if (values.length === 0 || this.props.taskAttribute.is_recurrent) { // Future: if we can EDIT recurrent attrs, this is too simple
			apiPromise = this.props.onCreate(this.props.taskAttribute.id, value)
		} else {
			apiPromise = this.props.onSave(this.props.taskAttribute.id, values[values.length - 1].id, value)
		}
		return apiPromise
			.then(() => {
				window.setTimeout(() => this.setState({ isLoading: false, justSaved: true }), TIME_TO_LOAD)
				window.setTimeout(() => this.setState({ justSaved: false }), TIME_TO_LOAD + TIME_TO_SHOW_SAVED)
			})
			.catch(e => {
				this.setState({ isLoading: false, hasError: true, justSaved: false })
			})
	}


	render() {
		const { taskAttribute } = this.props
		return (
			<div className="attribute-field">
				<div className="form-label">
					{taskAttribute.name}
				</div>
				{this.renderValue()}
			</div>
		)
	}
	
	renderValue() {
		const { taskAttribute } = this.props
		const isBoolean = taskAttribute.datatype === 'BOOL'
		if (taskAttribute.is_recurrent) {
			return <TaskRecurrentAttribute
				loggedValues={taskAttribute.values}
				onSave={this.handleSave}
				isBoolean={isBoolean}
				{...this.state}
			/>
		}

    const values = taskAttribute.values
		const taskAttributeValue = values.length === 0 ? '' : values[values.length - 1].value
		switch (taskAttribute.datatype) {
    		case 'BOOL':
      			return <BooleanAttribute 
							value={taskAttributeValue} 
							onSave={this.handleSave}
							{...this.state}
						/>
			case 'TIME':
				return <TimeAttribute 
							value={taskAttributeValue} 
							onSave={this.handleSave} 
							teamTimeFormat={teamTimeFormat}
							{...this.state}
						/>
			default:
				return <TextAttribute 
							value={taskAttributeValue} 
							onSave={this.handleSave} 
							{...this.state}
						/>
		}
	}
}

class BooleanAttribute extends React.Component {
	constructor(props) {
		super(props)
		this.handleChange = this.handleChange.bind(this)
	}

	handleChange(val) {
		//Set new value to opposite of existing value
		const newValue = this.props.value ? '' : 'true'
		this.props.onSave(newValue)
	}

	render() {
		let { value } = this.props
		const boolValue = value === 'true'
		const stringValue = boolValue ? 'Yes' : 'No'
		return (
			<div className="boolean-container">
				{stringValue}
				<Switch
					value={boolValue}
					onClick={this.handleChange}
				/>
				<Peripherals {...this.props} onRetry={this.handleSave} />
			</div>
		)
	}
}


class TextAttribute extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			draftValue: props.value,
		}
		this.handleInputChange = this.handleInputChange.bind(this)
		this.handleSave = this.handleSave.bind(this)
		this.handleReset = this.handleReset.bind(this)
	}
	
	handleInputChange(e) {
		let word = e.target.value
		this.setState({ draftValue: word})
		window.setTimeout(() => {
			if(word === this.state.draftValue &&
				word !== this.props.value) {
				this.handleSaveWrapper(word)
			}
		}, TIME_TO_STAY_UNSAVED)
	}

	handleReset() {
		this.setState({ draftValue: this.props.value })
	}

	handleSave() {
		if (this.state.draftValue === this.props.value) {
			return
		}
		this.handleSaveWrapper(this.state.draftValue)
	}

	handleSaveWrapper(v) {
		this.props.onSave(v)
	}

	render() {
		const { draftValue } = this.state
		return (
			<div className="input-container">
				<Input
					className={this.props.hasError && "attr-error"}
					value={draftValue}
					onChange={this.handleInputChange}
				/>
				<Peripherals {...this.props} onRetry={this.handleSave} />
			</div>
		)
	}
}

class TimeAttribute extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			draftValue: props.value,
			teamTimeFormat: props.teamTimeFormat,
		}	
		this.handleSave = this.handleSave.bind(this)
	}

	handleSave(value) {
		let new_time = moment(value).utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]")
		if(this.state.draftValue !== new_time) {
			this.setState({ draftValue: new_time})
			this.handleSaveWrapper(new_time)
		}
		return 
	}

	handleSaveWrapper(v) {
		this.props.onSave(v)
	}

	isValidISODate(dateString) {
        return moment(dateString, moment.ISO_8601, true).isValid()
    }

	render() {
		const isNormal = this.state.teamTimeFormat === 'n'
		const format = isNormal ? "YYYY-MM-DD h:mm a" : "YYYY-MM-DD HH:mm"
		const timeFormat = isNormal ? "hh:mm a" : "HH:mm"
		const use12Hours = isNormal

		if(this.isValidISODate(this.state.draftValue)){
			let dateTime = moment(this.state.draftValue)
			return (
				<div className="input-container">
					<DatePicker
					    showTime={{format: timeFormat, use12Hours: use12Hours}}
					    format={format}
					    placeholder="Select Time"
					    defaultValue={dateTime}
					    onOk={this.handleSave}
					/>
					<Peripherals {...this.props} onRetry={this.handleSave} />
				</div>
			)
		} else {
			let dateTime = this.state.draftValue
			return (
				<div className="input-container">
					<DatePicker
					    showTime={{format: timeFormat, use12Hours: use12Hours}}
					    format={format}
					    placeholder={dateTime}
					    onOk={this.handleSave}
					/>
					<Peripherals {...this.props} onRetry={this.handleSave} />
				</div>
			)
		}
	}
}

export function Peripherals({ isLoading, justSaved, hasError, onRetry }) {
	let peripheral = false
	if (isLoading) {
		peripheral = <Loading />
	} else if(justSaved) {
		peripheral = <div>Saved!</div>
	} else if(hasError) {
		peripheral = <Error onRetry={onRetry}/>
	}
	return <div className="input-peripherals">{peripheral}</div>
}

function Error({ onRetry }) {
	return (
		<div className="input-peripherals-error" onClick={onRetry}>
			Oops! Something went wrong.<br/>
			<i className="material-icons">refresh</i>
			<span>Try again</span>
		</div>
	)
}

function Loading(props) {
	return <div className="task-attr-loading"><Spinner fadeIn="quarter" name="circle" color="#7AD69B"/></div>
}
