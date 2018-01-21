import React from 'react'
import WalkthroughButton from './WalkthroughButton'
import Card from '../Card/Card'

export default class WalkthroughProcessesAndProducts extends React.Component {
	render() {
		return (
			<div>
				<Card>
					<div className="walkthrough-container">
						<div className="walkthrough-header">Hello, team {'import team name'}</div>
						<WalkthroughButton title="Got it" onClick={() => this.props.onCompleteStage()} />
					</div>
				</Card>
			</div>
		)
	}
}