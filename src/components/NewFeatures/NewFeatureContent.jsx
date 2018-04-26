import React from 'react'
import {emojify} from 'react-emojione'
import './styles/newfeatures.css'

const nfs = [{
	title: "Better inventory adjustments.",
	content: "Now, you can add an explanation to your inventory adjustments, eg. 'mistake' or 'delivery'.",
	type: "improvement",
}, {
	title: "Search through processes and products.",
	content: "We know those process and products lists can get long, so we added a search bar to help you find what you're looking for on the list pages."
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

// const nfs = [{
// 	title: 'A new and improved inventory experience',
// 	content: (
// 		<div>
// 			<br />
// 			<p>
// 				We've been hearing for a long time that Polymer's inventory was buggy and difficult. 
// 				It took way too long and way too many frowns to make your inventory reflect reality.
// 			</p>
// 			<br />
// 			<p>
// 				Today, we're introducing a brand new inventory experience. Your stock counts
// 				will still be updated as you create and use items, but you also have the option
// 				to manually adjust the counts without having to select every item you need to send away.
// 			</p>
// 			<br />
// 			<p>
// 				{'If you do need to move specific items, you can do it through the Polymer iOS app. '} 
// 				<a href="https://polymer.helpscoutdocs.com/article/4-managing-your-inventory" target="_blank"  rel="noopener noreferrer" style={{color: "#0079F3"}}>Learn more at our Helpdesk.</a>
// 			</p>
// 		</div>
// 	),
// 	type: 'improvement',
// }]

// const nfs = [{
// 	title: "Know when an ancestor of your task is flagged",
// 	content: "When you visit a task's page on the dashboard or the app that has a flagged ancestor, we'll display this information prominently. You can review the flagged ancestors directly from the task page.",
// }, {
// 	title: "Flags everywhere on the mobile app!",
// 	content: "You'll see flags on the homepage of the Polymer app now, along with an orange indication if the task has a flagged ancestor. You may need to force quit the app to see this update."
// }, {
// 	title: "Task QR codes on the dashboard",
// 	content: "We made it easier for you to go between the dashboard and the app. Scan the QR code on a task's dashboard page with the Polymer app to open it in the app."
// }]

