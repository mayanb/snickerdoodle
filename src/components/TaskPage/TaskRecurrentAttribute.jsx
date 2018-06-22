import React from 'react'
import moment from 'moment'
import './styles/taskrecurrentattribute.css'
import { Input, List } from 'antd'
const Search = Input.Search

export default function TaskRecurrentAttribute({taskAttribute}) {
	const attributeValuesOldestToNewest = taskAttribute.values.sort((a,b) => new Date(a.updated_at) - new Date(b.updated_at))
	return (
		<div className="task-recurrent-attribute">
			<List
				bordered
				dataSource={attributeValuesOldestToNewest}
				renderItem={log => <Log log={log}/>}
			/>
			<Search
				placeholder="Log a new value"
				enterButton="Add"
				size="large"
				onSearch={value => console.log(value)}
			/>
		</div>
	)
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