import React from 'react'
import Img from '../Img/Img'
import './styles/tabs.css'


/*
takes in:
tabs = { title: String , active: bool }
onTab = function (tab)
*/

export default function Tabs(props) {
	return (
		<div className="tabs-wrapper">
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
		<div className={`tab-wrapper ${props.active?"active-tab":""}`} onClick={props.onClick}>
			{props.img &&
			<span className="icon-wrapper">
				<Img src={props.img} height="24px" className="icon"/>
			</span>
			}
			<span className="title">{props.title}</span>
		</div>
	)
}