import React from 'react'
import {connect} from 'react-redux'
import Card from '../Card/Card'
import Button from '../Card/Button'
import WalkthroughHint from './WalkthroughHint'
import WalkthroughButton from './WalkthroughButton'
import './styles/walkthroughcoreconcepts.css'

function WalkthroughCoreConcepts(props) {
	let {user} = props
	return (
		<div className="walkthrough-small">
			<Card nopadding>
				<div className="walkthrough-core-concepts">
					<span className="walkthrough-header">Hello, team <span style={{fontWeight: "700"}}>{user.team_name || "alabama"}</span>!</span>
					<WalkthroughHint>Before we set you up, let’s learn about the two core parts of Polymer.</WalkthroughHint>
					<CoreConceptSection><span style={{fontWeight: "700"}}>Processes</span> are things you can do.</CoreConceptSection>
					<CoreConceptSection><span style={{fontWeight: "700"}}>Products</span> are things you can make.</CoreConceptSection>
					<WalkthroughButton title="Got it!" onClick={() => {}}/>
				</div>
			</Card>
		</div>
	)
}

function CoreConceptSection(props) {
	return (
		<div className="core-concept-section">
		{props.children}
		</div>
	)
}

class Example extends React.Component {
	render() {
		return (
			<div className="walkthrough-example">
				<Button link>{this.props.title}</Button>
				<div>
					<span>{this.props.tooltip}</span>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state/*, props*/) => {
	let {data, ui} = state.users
	if (ui.activeUser && ui.activeUser >= 0 && ui.activeUser < data.length) {
		let account = data[ui.activeUser]
  	return { user: account.user }
  }
  return { user: {}}
}

export default connect(mapStateToProps)(WalkthroughCoreConcepts)



