import React from 'react'
import {emojify} from 'react-emojione'
// import {Link} from 'react-router-dom'
import Pill from '../Pill/Pill'
import './styles/newfeatures.css'

const nfs = [{
	title: "Understand factory costs like never before.",
	content: (<span><a href='https://polymer.helpscoutdocs.com/article/21-understanding-and-setting-costs-for-tasks' target="_blank" rel="noopener noreferrer">
		Learn how to track the cost of every item in your factory in real time.
	</a></span>),
	type: 'feature',
}]

let HEADER = {display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px 0'}
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
			<Pill color={type==='improvement'?'purple':'turquoise'}>{type==='improvement'?'Improvement':'New feature'}</Pill>
			<span className="nf-title">{title}&nbsp;</span>
			<span className="nf-content">{content}</span>
		</div>
	)
}



// ,{
// 	title: "Keep track of changes in your log fields.",
// 		content: <span>You can now fill in log fields multiple times! Record multiple entries for each log field, and keep track of changes. <Link to='/processes'>Add recurring fields to a process now.</Link></span>,
// 		type: 'feature',
// }
// const nfs = [{
// 	title: "Track tasks more accurately.",
// 	content: "We’ve given the mobile app faster, more precise time inputting. This means using Time Fields for your Processes now helps squash input error, save time, and give you even finer control over your production line.",
// 	type: 'improvement',
// }]

// const nfs = [{
// 	title: "Get production insights fast.",
// 	content: "We've revamped the Activity Log — you can now ask complex questions about your production line with a few keystrokes, quickly drilling down to get the nuanced insights you need.",
// 	type: 'improvement',
// }, {
// 	title: "Add user fields.",
// 	content: "Improve your record keeping by logging operators. You can now easily log who’s working on each task by selecting from a list of usernames. Visit the Process page to learn more.",
// 	type: 'improvement',
// }, {
// 	title: "Stay organized with recipes.",
// 	content: "Guide your team every step of the way with instructions and ingredient information. With recipes, your team is guided directly in the app on what to do, what to use, and how much. Visit the Products page to get started.",
// }]

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

