import React from 'react'
import WalkthroughButton from './WalkthroughButton'
import Card from '../Card/Card'

export default class WalkthroughExampleApp extends React.Component {
	render() {
		return (
			<div>
				<Card>
					<div className="walkthrough-container">
						<div className="walkthrough-header">Great! Let's take a look at what your team will see when they log a
							process.
						</div>
						<WalkthroughButton title="Continue"
						                   onClick={() => this.props.onCompleteStage()}></WalkthroughButton>
					</div>
				</Card>
			</div>
		)
	}
}


