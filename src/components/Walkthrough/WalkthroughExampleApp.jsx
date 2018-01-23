import React from 'react'
import WalkthroughButton from './WalkthroughButton'
import Card from '../Card/Card'
import Img from '../Img/Img'

export default class WalkthroughExampleApp extends React.Component {
	render() {
		return (
			<div>
				<Card>
					<div className="walkthrough-container">
						<div className="walkthrough-header">Let's find out what your team will see. </div>
						<div className="subtitle">Whenever your team runs this process and uses the Polymer app, they will be prompted to fill out the logs you defined.</div>
						<Img src="sample-content" width='324px' style={{marginBottom: '24px', borderRadius: '4px'}} />
						<WalkthroughButton title="Continue"
						                   onClick={() => this.props.onCompleteStage()}></WalkthroughButton>
					</div>
				</Card>
			</div>
		)
	}
}


