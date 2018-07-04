import React from 'react'
import './styles/taskform.css'
import './styles/peripherals.css'
import moment from 'moment'
import { DatePicker } from 'antd';
import { Peripherals } from './TaskForm'
import { isValidISODate, getTimeFormat } from '../../utilities/dateutils'

export default class TimeAttribute extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			draftValue: props.value,
		}
		this.handleSave = this.handleSave.bind(this)
	}
	
	handleSave(value) {
		let new_time = moment(value).utc().format("YYYY-MM-DDTHH:mm:ss.SSS[Z]")
		if(this.state.draftValue !== new_time) {
			this.setState({ draftValue: new_time})
			this.handleSaveWrapper(new_time)
		}
	}
	
	handleSaveWrapper(v) {
		this.props.onSave(v)
	}
	
	render() {
		const { teamTimeFormat } = this.props
		const { draftValue } = this.state
		
		const format = getTimeFormat(teamTimeFormat)
		const use12Hours = teamTimeFormat === 'n'
		const defaultValue = isValidISODate(draftValue) ? moment(draftValue) : undefined
		const placeholder = isValidISODate(draftValue) ? 'Select a Time' : draftValue
		return (
			<div className="input-container">
				<DatePicker
					showTime={{format: format, use12Hours: use12Hours}}
					format={format}
					placeholder={placeholder}
					defaultValue={defaultValue}
					onOk={this.handleSave}
					size="large"
				/>
				<Peripherals {...this.props} onRetry={this.handleSave} />
			</div>
		)
	}
}
