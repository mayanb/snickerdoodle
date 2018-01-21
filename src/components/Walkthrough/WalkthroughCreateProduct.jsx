import React from 'react'
import WalkthroughButton from './WalkthroughButton'
import WalkthroughInput from './WalkthroughInput'
import WalkthroughHint from './WalkthroughHint'
import Card from '../Card/Card'

export default class WalkthroughCreateProduct extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			pageNumber: 0,
			pages: [
				this.renderCreateProduct.bind(this),
				this.renderCreateRules.bind(this)
			]
		}
	}

	render() {
		const Page = this.state.pages[this.state.pageNumber]
		return (
			<Page></Page>
		)
	}

	renderCreateProduct() {
		return (
			<div>
				<Card>
					<div className="walkthrough-container">
						<div className="walkthrough-header">Now let's make your first product.</div>
						<WalkthroughHint>A process is a single step at your factory that you want to log information
							for.</WalkthroughHint>
						<WalkthroughInput placeholder="Type your process name"></WalkthroughInput>
						<WalkthroughButton title="I made my first product"
						                   onClick={() => this.setState({ pageNumber: 1 })}></WalkthroughButton>
					</div>
				</Card>
			</div>
		)
	}

	renderCreateRules() {
		return (
				<div>
					<Card>
						<div className="walkthrough-container">
							<div className="walkthrough-header">Let's add some rules for your product.</div>
							<WalkthroughButton title="I added rules"
							                   onClick={() => this.props.onCompleteStage()}></WalkthroughButton>
						</div>
					</Card>
				</div>
		)
	}
}


