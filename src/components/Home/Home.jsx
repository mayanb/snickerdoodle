import React from 'react'
import Goals from '../Goals/Goals'
import ActivitySummary from '../ActivitySummary/ActivitySummary'
import Alerts from '../Alerts/Alerts'

export default function Home(props) {
	return (
		<div className="dashboard">

		<div className="dash-content">
			<div>
				<BigHeader>How's it going?</BigHeader>
				<div className={`activity goals page mini`}>
					<Goals/>
				</div>
			</div>

			<div>
				<LittleHeader>Activity Summary</LittleHeader>
				<div className={`activity goals page mini`}>
					<ActivitySummary />
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