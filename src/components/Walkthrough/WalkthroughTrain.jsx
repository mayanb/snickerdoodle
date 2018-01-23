import React from 'react'
import WalkthroughButton from './WalkthroughButton'
import Card from '../Card/Card'

export default class WalkthroughTrain extends React.Component {
	render() {
		return (
			<div className="walkthrough-create-user">
				<Card>
					<div className="walkthrough-container">
						<div className="walkthrough-header">Creating tasks with your processes and products</div>
						<div className="subtitle">
							Now, with the Polymer iOS app, you can create tasks whenever you run a process with a particular product. You’ll see all your tasks together on your dashboard as logs.
						</div>
						<div style={{textAlign: 'center', marginBottom: '24px'}}>
							<iframe title="youtube" width="560" height="315" src="https://www.youtube.com/embed/aQERftlJWz4?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
						</div>
						<WalkthroughButton title="Continue"
						                   onClick={() => this.props.onCompleteStage()}></WalkthroughButton>
					</div>
				</Card>
			</div>
		)
	}
}

