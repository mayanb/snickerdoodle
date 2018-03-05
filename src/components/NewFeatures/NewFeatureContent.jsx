import React from 'react'
import {emojify} from 'react-emojione'
import './styles/newfeatures.css'

let nfs = [{
	title: 'Create and delete attributes.',
	content: 'Minor bug fixes when you create and edit an attribute.',
	type: 'improvement',
}, {
	title: 'Create google spreadsheets.',
	content: 'We fixed a bug that prevented your Google account from being properly connected. If this still doesn\'t work for you, shoot us a line and we\'ll help you reconnect your account.',
	type: 'improvement',
}, {
	title: 'Chat with us, anytime.',
	content: 'Use the chat feature in the bottom right of any screen to send us a message and we\'ll get back to you within a couple of hours.',
	type: 'new-feature',
}, {
	title: 'Insightful metrics.',
	content: 'View your weekly, monthly, and historic production achievements through handy graphs on the dashboard. Your goals are still visible in the dashboard under the "Goals" tab.',
	type: 'new-feature',
}]


let HEADER = {fontSmoothing: 'antialiased', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px 0'}
let H1 = {color: "#0073F9", padding: "0 8px"}
export default function NewFeaturesContent(props) {
	return (
		<div style={{margin: "-16px"}}>
			<div style={HEADER} className="new-feature-header">
				{emojify(':tada:')}
				<h1 style={H1}>What's new</h1>
				{emojify(':tada:')}
			</div>

			<div className="features">
				{
					nfs.map((e, i) => {
						return <Feature {...e} key={i} />
					})
				}
			</div>
		</div>
	)
}

function Feature({title, type, content}) {
	return (
		<div className="nf">
			<span className={`nf-pill ${type || 'new-feature'}`}>{type==='improvement'?'Improvement':'New feature'}</span>
			<span className="nf-title">{title}&nbsp;</span>
			<span className="nf-content">{content}</span>
		</div>
	)
}

