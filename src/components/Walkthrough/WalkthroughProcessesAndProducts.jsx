import React from 'react'
import WalkthroughButton from './WalkthroughButton'
import WalkthroughHint from './WalkthroughHint'
import WalkthroughTooltip from './WalkthroughTooltip'
import Card from '../Card/Card'
import { connect } from 'react-redux'
import './styles/walkthroughprocessesandproducts.css'

export class WalkthroughProcessesAndProducts extends React.Component {
	render() {
		let { teamName } = this.props
		return (
			<div className="walkthrough-processes-and-products">
				<Card>
					<div className="walkthrough-container">
						<Header teamName={teamName}></Header>
						<div className="subtitle">
							Before we set you up, let's learn about the two core parts of Polymer.
						</div>
						<div className="core-parts">
							<span className="bold">Processes</span> are things you can do.
							<WalkthroughTooltip />
							<div className="see-examples">See examples</div>
						</div>
						<div className="core-parts">
							<span className="bold">Products</span> are things you can make.
							<div className="see-examples">See examples</div>
						</div>
						<WalkthroughButton title="Got it" onClick={() => this.props.onCompleteStage()} />
					</div>
					<WalkthroughHint>If you're a coffee factory</WalkthroughHint>
				</Card>
			</div>
		)
	}
}

function Header(props) {
	if (props.teamName) {
		return (
			<div className="walkthrough-header">Hello, team <span className="bold">{props.teamName}!</span></div>
		)
	} else {
		<div className="walkthrough-header">Hello!</div>
	}

}

const mapStateToProps = (state/*, props*/) => {
	let { data, ui } = state.users
	if (ui.activeUser && ui.activeUser >= 0 && data[ui.activeUser]) {
		return { teamName: data[ui.activeUser].user.team_name }
	}
	return { teamName: '' }
}

export default connect(mapStateToProps)(WalkthroughProcessesAndProducts)
