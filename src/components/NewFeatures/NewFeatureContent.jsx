import React from 'react'
import Img from '../Img/Img'

let better_goals = [
	'Make a single goal for multiple products (eg. track your progress for foiling any type of bar)', 
	'Delete and reorder goals by hitting “edit”'
]

let daily_report_emails = [
	'Get goals and notifications right in your inbox through a daily email.'
]
let email_special = <span>Set your email address in <a style={{color: "#0073F9"}} href="/account">account settings</a></span>

let notifications = [
	'Get notified on your homepage about flagged tasks, goal progress, and tasks with weird inputs.'
]


let HEADER = {fontSmoothing: 'antialiased', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px'}
let H1 = {color: "#0073F9", padding: "0 8px"}
export default function NewFeaturesContent(props) {
	return (
		<div>
			<div style={HEADER}>
				<img height="24px" src={emoji("1f389")} />
				<h1 style={H1}>What's new</h1>
				<img height="24px" src={emoji("1f389")} />
			</div>

			<Feature title={"Better goals"} items={better_goals}/>
			<Feature title={"Daily report emails"} items={daily_report_emails} special={email_special}/>
			<Feature title={"Notifications"} items={notifications}/>
		</div>
	)
}

function emoji(code) {
	return `https://cdnjs.cloudflare.com/ajax/libs/emojione/2.2.7/assets/png/${code}.png`
}

function Feature(props) {
	let {title, items, special} = props
	let WRAPPER = {margin:"24px 0"}
	let HEADER = {display: 'flex',marginBottom: "4px"}
	let H2 = {padding: "0 8px", lineHeight: "24px", fontSize: "20px"}
	let LI = {color: "#0073F9"}
	let LI_SPAN = {color: "rgba(0,0,0,0.6)"}
	return (
		<div style={WRAPPER}>
			<div style={HEADER}>
				<img height="24px" src={emoji("2705")} />
				<h2 style={H2}>{title}</h2>
			</div>
			<ul style={{listStyleType:"circle", paddingLeft: "32px"}}>
					{ items.map((i) => <li style={LI}><span style={LI_SPAN}>{i}</span></li>) }
					{ 
						special?(<li style={LI}><span style={LI_SPAN}>{special}</span></li>):false
					}
			</ul>
		</div>
	)
}

