import React from 'react'
import WalkthroughButton from './WalkthroughButton'
import Card from '../Card/Card'
import {emojify} from 'react-emojione'

export default class WalkthroughResources extends React.Component {
	render() {
		return (
			<div>
				<Card>
					<div className="walkthrough-container">
						<div className="walkthrough-header">Hooray! Track on!{emojify(':tada:')}</div>
						<div className="subtitle">
							Check out the <a className="walkthrough-link" href="https://polymer-publications.gitbooks.io/getting-started/content/">Getting Started guide</a>, 
							where you’ll find resources to train your employees and make the most of the Polymer platform. 
						</div>
						<WalkthroughButton title="Continue"
						                   onClick={() => this.props.onCompleteStage()}></WalkthroughButton>
					</div>
				</Card>
			</div>
		)
	}
}

