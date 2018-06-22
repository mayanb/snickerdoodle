import React from 'react'
import './styles/taskrecurrentattribute.css'
import { Input as AntDInput, List } from 'antd'
const Search = AntDInput.Search

export default function RecurrentAttribute({taskAttribute}) {
	const data = [
		'Racing car sprays burning fuel into crowd.',
		'Japanese princess to wed commoner.',
		'Australian walks 100km after outback crash.',
		'Man charged over missing wedding girl.',
		'Los Angeles battles huge wildfires.',
	]
	return (
		<div className="task-recurrent-attribute">
			<List
				bordered
				dataSource={data}
				renderItem={item => <Log item={item}/>}
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

function Log({item}) {
	return (
		<List.Item>
			<div className="log">
				<div className="value">Editable value</div>
				<div className="time">One day ago (June 19, 9:31am)</div>
			</div>
		</List.Item>
	)
}