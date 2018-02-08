import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import WalkthroughFrame from './WalkthroughFrame'
import WalkthroughProcessesAndProducts from './WalkthroughProcessesAndProducts'
import WalkthroughCreateProcess from './WalkthroughCreateProcess'
import WalkthroughExampleApp from './WalkthroughExampleApp'
import WalkthroughCreateProduct from './WalkthroughCreateProduct'
import WalkthroughTrain from './WalkthroughTrain'
import './styles/walkthrough.css'
import * as actions from "./WalkthroughActions"
import WalkthroughResources from './WalkthroughResources'
import {shouldCompleteWalkthrough} from '../../authentication/authentication'

const stages = [
	"div",
	WalkthroughProcessesAndProducts,
	WalkthroughCreateProcess,
	WalkthroughExampleApp,
	WalkthroughCreateProduct,
	WalkthroughTrain,
	WalkthroughResources,
]

class Walkthrough extends React.Component {
	render() {
		// there is an error or u are not logged in, so redirect to login 
		let stageNumber = this.props.user.walkthrough
		if (isNaN(stageNumber) || !shouldCompleteWalkthrough(this.props.users)) {
			this.props.history.push('/login')
			return <div />
		}
		console.log()
		const Stage = stages[stageNumber]
		return (
			<WalkthroughFrame>
				<Stage onCompleteStage={this.handleCompleteStage.bind(this)} />
			</WalkthroughFrame>
		)
	}

	handleCompleteStage() {
		let stageNumber = this.props.user.walkthrough
		if (stageNumber === (stages.length - 1)) {
			this.props.dispatch(actions.completeWalkthrough(this.props.user))
			this.props.history.push('/')
		} else {
			this.props.dispatch(actions.incrementWalkthrough(this.props.user))
		}
	}
}


const mapStateToProps = (state/*, props*/) => {
	let { data, ui } = state.users
	if (ui.activeUser && ui.activeUser >= 0 && data[ui.activeUser]) {
		return { user: data[ui.activeUser].user, users: state.users }
	}
	return { user: {} }
}

export default withRouter(connect(mapStateToProps)(Walkthrough))