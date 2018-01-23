import React from 'react'
import Card from '../Card/Card'

export default function Updates(props) {
	return (
		<div style={{flex: 1}}>
			<Card className="updates">
				<span>Download the app onto iPhone/iPod at plmr.io/app</span>
			</Card>

			<Card className="updates">
				<span>Read the Getting Started guide to learn how to use Polymer and onboard your team</span>
			</Card>

			<Card className="updates">
				<span>Print your first QR codes</span>
			</Card>

		</div>
	)
}