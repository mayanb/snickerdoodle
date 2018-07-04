import React from 'react'
import moment from 'moment'
import Switch from '../Switch/Switch'
import {
	TIME,
	BOOL,
} from '../../utilities/constants'
import './styles/taskrecurrentattribute.css'
import TimeAttribute from './TimeAttribute'
import { getDateDisplay } from '../../utilities/dateutils'
import { Input, List, Button } from 'antd'
const Search = Input.Search

export default class TaskRecurrentAttribute extends React.Component {
	constructor(props) {
		super(props)
		this.state = {inputValue: ''}
		
		this.handleSearch = this.handleSearch.bind(this)
		this.handleToggle = this.handleToggle.bind(this)
		this.handleToggleSubmit = this.handleToggleSubmit.bind(this)
	}
	
	render() {
		const { loggedValues } = this.props
		return (
			<div className="task-recurrent-attribute">
				{(loggedValues.length === 0) ? <ZeroState /> : <List
					bordered
					dataSource={loggedValues}
					renderItem={log => <Log log={log}/>}
				/>}
				{this.newEntryInput()}
			</div>
		)
	}
	
	newEntryInput() {
		const { teamTimeFormat, type } = this.props
		const { inputValue } = this.state
		
		switch (type) {
			case BOOL:
				return (
					<BooleanAttribute
						value={inputValue}
						onToggle={this.handleToggle}
						onToggleSubmit={this.handleToggleSubmit}
					/>
				)
			case TIME:
				return (
					<TimeAttribute
						value="Log a new date and time"
						onSave={this.handleSearch}
						teamTimeFormat={teamTimeFormat}
						{...this.props}
					/>
				)
			default: // USER, TEXT, NUMB
				return (
					<Search
						placeholder="Log a new value"
						enterButton="Add"
						size="large"
						value={inputValue}
						onSearch={this.handleSearch}
						style={{marginTop: '16px'}}
						onChange={e => this.setState({ inputValue: e.target.value})}
					/>
				)
		}
	}
	
	handleToggle(value) {
		this.setState({ inputValue: value })
	}
	
	handleToggleSubmit(value) {
		this.props.onSave(value ? 'true' : '')
	}
	
	handleSearch(value) {
		if (value === '') {
			return
		}
		this.props.onSave(value)
		this.setState({ inputValue: ''})
	}
}

function ZeroState() {
	return (
		<div className="attribute-zero-state">Nothing has been logged yet.</div>
	)
}

function BooleanAttribute({ value, onToggle, onToggleSubmit }) {
	const yesOrNo = value ? 'Yes' : 'No'
	return (
		<div className="boolean-container">
			{yesOrNo}
			<Switch
				value={!!value}
				onClick={() => onToggle(!value)}
			/>
			<Button type="primary" onClick={() => onToggleSubmit(value)} style={{marginLeft: '16px'}}>
				Add
			</Button>
		</div>
	)
}

function Log({log}) {
	const logTime = moment(log.created_at)
	const displayTime = `${logTime.fromNow()} (${logTime.format("MMMM DD, hh:mma")})`
	return (
		<List.Item>
			<div className="log">
				<div className="value">{getDisplayValue(log.value, log.datatype)}</div>
				<div className="time">{displayTime}</div>
			</div>
		</List.Item>
	)
}

function getDisplayValue(value, type) {
	switch (type) {
		case BOOL:
			return value ? 'Yes' : 'No'
		case TIME:
			return getDateDisplay(value)
		default:
			return value
	}
}