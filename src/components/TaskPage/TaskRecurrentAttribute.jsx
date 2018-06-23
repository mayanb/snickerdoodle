import React from 'react'
import moment from 'moment'
import Switch from '../Switch/Switch'
import './styles/taskrecurrentattribute.css'
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
		const { loggedValues, isBoolean } = this.props
		const { inputValue } = this.state
		return (
			<div className="task-recurrent-attribute">
				{(loggedValues.length !== 0) && <List
					bordered
					dataSource={loggedValues}
					renderItem={log => <Log log={log}/>}
				/>}
				{isBoolean ? <BooleanAttribute value={inputValue} onToggle={this.handleToggle} onToggleSubmit={this.handleToggleSubmit}/>
					: <Search
						placeholder="Log a new value"
						enterButton="Add"
						size="large"
						value={inputValue}
						onSearch={this.handleSearch}
						style={{marginTop: '16px'}}
						onChange={e => this.setState({ inputValue: e.target.value})}
					/>}
			</div>
		)
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
	const logTime = moment(log.updated_at)
	const displayTime = `${logTime.fromNow()} (${logTime.format("MMMM DD, hh:mma")})`
	const displayValue = log.datatype === 'BOOL' ? (log.value ? 'Yes' : 'No') : log.value
	return (
		<List.Item>
			<div className="log">
				<div className="value">{displayValue}</div>
				<div className="time">{displayTime}</div>
			</div>
		</List.Item>
	)
}