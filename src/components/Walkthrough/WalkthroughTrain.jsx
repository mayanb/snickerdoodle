import React from 'react'
import WalkthroughButton from './WalkthroughButton'
import Card from '../Card/Card'

export default class WalkthroughTrain extends React.Component {
	render() {
		return (
			<div>
				<Card>
					<div className="walkthrough-container">
						<div className="walkthrough-header">Train your employees</div>
						<WalkthroughButton title="Ready to start!"
						                   onClick={() => this.props.onCompleteStage()}></WalkthroughButton>
					</div>
				</Card>
			</div>
		)
	}
}

