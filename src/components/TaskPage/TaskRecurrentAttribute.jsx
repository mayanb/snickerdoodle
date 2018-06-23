import React from 'react'
import moment from 'moment'
import './styles/taskrecurrentattribute.css'
import { Input, List } from 'antd'
const Search = Input.Search

export default class TaskRecurrentAttribute extends React.Component {
	constructor(props) {
		super(props)
		this.state = {inputValue: ''}
		
		this.handleSearch = this.handleSearch.bind(this)
	}
	
	render() {
		const { loggedValues } = this.props
		const { inputValue } = this.state
		return (
			<div className="task-recurrent-attribute">
				{(loggedValues.length !== 0) && <List
					bordered
					dataSource={loggedValues}
					renderItem={log => <Log log={log}/>}
				/>}
				<Search
					placeholder="Log a new value"
					enterButton="Add"
					size="large"
					value={inputValue}
					onSearch={this.handleSearch}
					style={{marginTop: '16px'}}
					onChange={e => this.setState({ inputValue: e.target.value})}
				/>
			</div>
		)
	}
	
	handleSearch(value) {
		if (value === '') {
			return
		}
		this.props.onSave(value)
		this.setState({ inputValue: ''})
	}
}

function Log({log}) {
	const logTime = moment(log.updated_at)
	const displayTime = `${logTime.fromNow()} (${logTime.format("MMMM DD, hh:mma")})`
	return (
		<List.Item>
			<div className="log">
				<div className="value">{log.value}</div>
				<div className="time">{displayTime}</div>
			</div>
		</List.Item>
	)
}