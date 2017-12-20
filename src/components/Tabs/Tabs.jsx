import React from 'react'

export default function Tabs(props) {
	return (
		<div className="tabs">
		{
			props.tabs.map(function (t, i) {
				return <Tab key={i} {...t} onClick={(e) => props.onTab(t)}/>
			})
		}
		</div>
	)
}

function Tab(props) {
	return (
		<div className={props.active?"active-tab":""} onClick={props.onClick}>
			<span>{props.title}</span>
		</div>
	)
}