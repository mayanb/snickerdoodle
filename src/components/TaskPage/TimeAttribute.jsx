import React from 'react'
import './styles/taskform.css'
import './styles/peripherals.css'
import moment from 'moment'
import { DatePicker } from 'antd';
import { Peripherals } from './TaskForm'
import { isValidISODate } from '../../utilities/dateutils'

export default class TimeAttribute extends React.Component {
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
	
	render() {
		const isNormal = this.state.teamTimeFormat === 'n'
		const format = isNormal ? "YYYY-MM-DD h:mm a" : "YYYY-MM-DD HH:mm"
		const timeFormat = isNormal ? "hh:mm a" : "HH:mm"
		const use12Hours = isNormal
		
		if(isValidISODate(this.state.draftValue)){
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
