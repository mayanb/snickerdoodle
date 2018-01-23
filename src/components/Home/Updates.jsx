import React from 'react'
import Card from '../Card/Card'

export default function Updates(props) {
	return (
		<div style={{flex: 1}}>
			<Card className="updates">
				<span>Download the app onto iPhone/iPod at <a target="_blank" href="goo.gl/qSmJE6">goo.gl/qSmJE6</a> </span>
			</Card>

			<Card className="updates">
				<span>Read the <a target="_blank" href="https://polymer-publications.gitbooks.io/getting-started/content/">Getting Started guide</a> to learn how to use Polymer and onboard your team</span>
			</Card>

			<Card className="updates">
				<span><a target="_blank" href="https://polymer-publications.gitbooks.io/getting-started/content/printing-brother-printer.html">Print your first QR codes</a></span>
			</Card>

		</div>
	)
}