import React from 'react'
import Goals from '../Goals/Goals'
import Activity from '../Activity/Activity'
import Alerts from '../Alerts/Alerts'
import Card from '../Card/Card'

export default function Home(props) {
	return (
		<div className="dashboard">

		<div className="dash-content">


			<div>


				<div style={{maxWidth: "400px", minWidth: "400px"}}>
					<BigHeader>How's it going?</BigHeader>
					<Card>
						<Goals/>
					</Card>
				</div>

				<div style={{maxWidth: "900px", minWidth: "700px"}}>
					<LittleHeader>Activity</LittleHeader>
					<Activity />
				</div>
			</div>
		</div>


			<div className="panel">
				<div className="alerts-container">
					<LittleHeader>Alerts</LittleHeader>
						<Alerts />
				</div>
			</div>
			
		</div>
	)
}

function BigHeader(props) {
	return (
		<span style={{fontSize: "20px", lineHeight: "32px", color: '#445562', paddingTop: '5px', paddingBottom: '11px', display: 'block'}}>
			{props.children}
		</span>
	)
}

function LittleHeader(props) {
	return (
		<span className="little-header" style={{fontSize: "14px", lineHeight: "16px", color: '#445562', padding: "16px 0px", display: 'block'}}>
			{props.children}
		</span>
	)
}