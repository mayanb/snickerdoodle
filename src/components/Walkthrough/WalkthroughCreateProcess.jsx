import React from 'react'
import WalkthroughButton from './WalkthroughButton'
import WalkthroughInput from './WalkthroughInput'
import Card from '../Card/Card'
import WalkthroughHint from './WalkthroughHint'

export default class WalkthroughCreateProcess extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			pageNumber: 0,
			pages: [
				this.renderCreateProcess.bind(this),
				this.renderCreateAttributes.bind(this)
			]
		}
	}

	render() {
		const Page = this.state.pages[this.state.pageNumber]
		return (
			<Page></Page>
		)
	}

	renderCreateProcess() {
		return (
			<div>
				<Card>
					<div className="walkthrough-container">
						<div className="walkthrough-header">Let's make your first process</div>
						<WalkthroughHint>A process is a single step at your factory that you want to log information
							for.</WalkthroughHint>
						<WalkthroughInput placeholder="Type your process name"></WalkthroughInput>
						<WalkthroughButton title="Got it" onClick={() => this.setState({ pageNumber: 1 })}></WalkthroughButton>
					</div>
				</Card>
			</div>
		)
	}

	renderCreateAttributes() {
		return (
			<div>
				<Card>
					<div className="walkthrough-container">
						<div className="walkthrough-header">Now, let's tell your team what to log for this process.</div>
						<div>Whenever {'Roasting'} happens, I need to know:</div>
						<WalkthroughButton title="I added log fields"
						                   onClick={() => this.props.onCompleteStage()}></WalkthroughButton>
					</div>
				</Card>
			</div>
		)
	}
}


