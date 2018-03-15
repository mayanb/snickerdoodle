import React from 'react'
import {emojify} from 'react-emojione'
import './styles/newfeatures.css'

const nfs = [{
	title: 'A new and improved inventory experience',
	content: (
		<div>
			<br />
			<p>
				We've been hearing for a long time that Polymer's inventory was buggy and difficult. 
				It took way too long and way too many frowns to make your inventory reflect reality.
			</p>
			<br />
			<p>
				Today, we're introducing a brand new inventory experience. Your stock counts
				will still be updated as you create and use items, but you also have the option
				to manually adjust the counts without having to select every item you need to send away.
			</p>
			<br />
			<p>
				{'If you do need to move specific items, you can do it through the Polymer iOS app. '} 
				<a href="https://polymer.helpscoutdocs.com/article/4-managing-your-inventory" target="_blank" style={{color: "#0079F3"}}>Learn more at our Helpdesk.</a> 
			</p>
		</div>
	),
	type: 'improvement',
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

const nfsOld = [{
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


